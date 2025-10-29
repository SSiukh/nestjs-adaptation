import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository'

import { NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsListQueryParamsDto } from 'src/modules/main/dto/params/news-list.query-params.dto'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>,
    private newsDataMapper: NewsDataMapper,
  ) {}

  async getList(params: NewsListQueryParamsDto): Promise<{ data: NewsToListItem[] }> {
    const query = this.newsRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.translations', 'newsTranslations')
      .leftJoinAndSelect('news.category', 'category')
      .leftJoinAndSelect('category.translations', 'categoryTranslations')
      .where('news.isPublished = :isPublished', { isPublished: true })

    const { newsCategory, lang, searchTerm, publishedBefore, publishedAfter } = params

    if (newsCategory) {
      query.andWhere('(categoryTranslations.title = :newsCategory)', { newsCategory })
    }

    if (lang) {
      query.andWhere('newsTranslations.lang = :lang', { lang }).andWhere('categoryTranslations.lang = :lang', { lang })
    }

    if (searchTerm) {
      query.andWhere(
        'newsTranslations.title ILIKE :searchTerm OR newsTranslations.shortDescription ILIKE :searchTerm',
        { searchTerm: `%${searchTerm}%` },
      )
    }

    if (publishedBefore) {
      query.andWhere('news.publishedAt <= :publishedBefore', { publishedBefore })
    }

    if (publishedAfter) {
      query.andWhere('news.publishedAt >= :publishedAfter', { publishedAfter })
    }

    const newsList = await query.getMany()

    return { data: newsList.map((news) => this.newsDataMapper.toSearchResult(news)) }
  }

  async getItemById(id: string, lang: string): Promise<{ data: NewsToListItem }> {
    const query = this.newsRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.translations', 'newsTranslations')
      .leftJoinAndSelect('news.category', 'category')
      .leftJoinAndSelect('category.translations', 'categoryTranslations')
      .where('news.id = :id', { id })
      .andWhere('news.isPublished = :isPublished', { isPublished: true })

    if (lang) {
      query.andWhere('newsTranslations.lang = :lang', { lang })
    }

    const news = await query.getOne()

    if (!news) {
      throw new NotFoundException(`News with id: ${id} not found`)
    }

    return { data: this.newsDataMapper.toSearchResult(news) }
  }
}
