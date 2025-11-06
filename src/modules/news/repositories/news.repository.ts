import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NewsEntity } from 'src/modules/news/entities'
import { Repository } from 'typeorm'

import { BaseCrudRepository } from 'src/core/abstracts'

import { NewsListQueryParamsDto } from 'src/modules/news/dto/params'

@Injectable()
export class NewsRepository extends BaseCrudRepository<NewsEntity> {
  constructor(
    @InjectRepository(NewsEntity)
    repository: Repository<NewsEntity>,
  ) {
    super(repository)
  }

  async getList(params: NewsListQueryParamsDto): Promise<[NewsEntity[], number]> {
    const query = this.repository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.translationList', 'newsTranslations')
      .leftJoinAndSelect('news.newsCategory', 'category')
      .leftJoinAndSelect('category.translationList', 'categoryTranslations')
      .where('news.isPublished = :isPublished', { isPublished: true })

    const {
      newsCategory,
      lang,
      searchTerm,
      publishedBefore,
      publishedAfter,
      sortColumn,
      sortDirection,
      page,
      pageSize,
    } = params

    if (newsCategory) {
      query.andWhere('(category.id = :newsCategory OR category.id IS NULL)', { newsCategory })
    }

    this.applyLangFilter(query, ['newsTranslations', 'categoryTranslations'], lang)

    this.applySearchFilter(query, 'newsTranslations', searchTerm, ['title', 'description'])

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

    this.applyPagination(query, Number(page), Number(pageSize))

    return await query.getManyAndCount()
  }

  async findById(id: string): Promise<NewsEntity> {
    const news = await this.repository.findOne({
      where: { id },
      relations: ['newsCategory'],
    })

    if (!news) {
      throw new NotFoundException(`News with id: ${id} not found`)
    }

    return news
  }
}
