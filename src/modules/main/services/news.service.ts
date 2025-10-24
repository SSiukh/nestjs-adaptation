import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository'

import { NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsDataMapper } from 'src/modules/main/data-mappers/news.data-mapper'

@Injectable()
export class NewsService {
  constructor(
    @InjectRepository(NewsEntity) private newsRepository: Repository<NewsEntity>,
    private newsDataMapper: NewsDataMapper,
  ) {}

  async getList(lang: string): Promise<{ data: NewsToListItem[] }> {
    const query = this.newsRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.translations', 'translation')
      .where('news.isPublished = :isPublished', { isPublished: true })

    if (lang) {
      query.andWhere('translation.lang = :lang', { lang })
    }

    const newsList = await query.getMany()

    return { data: newsList.map((news) => this.newsDataMapper.toSearchResult(news)) }
  }

  async getItemById(id: string, lang: string): Promise<{ data: NewsToListItem }> {
    const query = this.newsRepository
      .createQueryBuilder('news')
      .leftJoinAndSelect('news.translations', 'translation')
      .where('news.id = :id', { id })
      .andWhere('news.isPublished = :isPublished', { isPublished: true })

    if (lang) {
      query.andWhere('translation.lang = :lang', { lang })
    }

    const news = await query.getOne()

    if (!news) {
      throw new NotFoundException(`News with id: ${id} not found`)
    }

    return { data: this.newsDataMapper.toSearchResult(news) }
  }
}
