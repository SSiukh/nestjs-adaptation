import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository'

import { RpcListResponse, RpcResponse } from 'src/core/interfaces/rpc'

import { NewsListQueryParamsDto } from 'src/modules/main/dto/params/news-list.query-params.dto'
import { CreateNewsDto, UpdateNewsDto } from 'src/modules/main/dto/requests'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>,
    private readonly newsDataMapper: NewsDataMapper,
  ) {}

  async getList(params: NewsListQueryParamsDto): Promise<RpcListResponse<NewsEntity>> {
    const query = this.newsRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.translationList', 'newsTranslations')
      .leftJoinAndSelect('news.newsCategory', 'category')
      .leftJoinAndSelect('category.translationList', 'categoryTranslations')
      .where('news.isPublished = :isPublished', { isPublished: true })

    const { newsCategory, lang, searchTerm, publishedBefore, publishedAfter, sortColumn, sortDirection } = params

    if (newsCategory) {
      query.andWhere('(category.id = :newsCategory OR category.id IS NULL)', { newsCategory })
    }

    if (lang) {
      query
        .andWhere('newsTranslations.lang = :lang', { lang })
        .andWhere('(categoryTranslations.lang = :lang OR category.id IS NULL)', { lang })
    }

    if (searchTerm) {
      query.andWhere(
        '("newsTranslations"."title" ILIKE :searchTerm OR "newsTranslations"."description" ILIKE :searchTerm)',
        { searchTerm: `%${searchTerm}%` },
      )
    }

    if (publishedBefore) {
      query.andWhere('news.publishedAt <= :publishedBefore', { publishedBefore })
    }

    if (publishedAfter) {
      query.andWhere('news.publishedAt >= :publishedAfter', { publishedAfter })
    }

    if (sortColumn && sortDirection) {
      if (sortColumn === 'title') {
        query.orderBy(`newsTranslations.${sortColumn}`, sortDirection)
      } else if (sortColumn === 'newsCategory') {
        query.orderBy(`categoryTranslations.title`, sortDirection)
      } else {
        query.orderBy(`news.${sortColumn}`, sortDirection)
      }
    }

    const [items, totalCount] = await query.getManyAndCount()

    return {
      data: items,
      meta: {
        total: totalCount,
      },
    }
  }

  async getItemById(id: string): Promise<RpcResponse<UpdateNewsDto>> {
    const news = await this.newsRepository.findOne({
      where: { id },
      relations: ['newsCategory'],
    })

    if (!news) {
      throw new NotFoundException(`News with id: ${id} not found`)
    }

    return { data: this.newsDataMapper.toSearchResult(news) }
  }

  async createItem(newsData: CreateNewsDto): Promise<{ data: NewsEntity }> {
    const news = this.newsRepository.create(newsData)

    const createdNews = await this.newsRepository.save(news)

    return { data: createdNews }
  }

  async updateItem(id: string, newsData: UpdateNewsDto): Promise<RpcResponse<NewsEntity>> {
    const normalizedNewsData = this.newsDataMapper.toEntity(newsData)
    const updatedNews = await this.newsRepository.preload({
      id,
      ...normalizedNewsData,
    })

    if (!updatedNews) {
      throw new NotFoundException(`News with id ${id} not found`)
    }

    await this.newsRepository.save(updatedNews)

    return { data: updatedNews }
  }

  async deleteItem(id: string): Promise<RpcResponse<NewsEntity>> {
    const news = await this.newsRepository.findOne({ where: { id } })

    if (!news) {
      throw new NotFoundException(`News with id ${id} not found`)
    }

    await this.newsRepository.remove(news)

    return { data: news }
  }
}
