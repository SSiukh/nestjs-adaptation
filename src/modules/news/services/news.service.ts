import { Inject, Injectable } from '@nestjs/common'
import { NewsRepositoryToken } from 'src/modules/news/datasets'
import { NewsEntity } from 'src/modules/news/entities'
import { NewsDataMapper } from 'src/modules/news/mappers/news.data-mapper'

import { RpcListResponse, RpcResponse } from 'src/core/interfaces/rpc'
import { IBaseCrud } from 'src/core/types'

import { NewsListQueryParamsDto } from 'src/modules/news/dto/params'
import { NewsRequestDto } from 'src/modules/news/dto/requests'

@Injectable()
export class NewsService {
  constructor(
    @Inject(NewsRepositoryToken)
    private readonly repository: IBaseCrud<NewsEntity>,
    private readonly newsDataMapper: NewsDataMapper,
  ) {}

  async getList(params: NewsListQueryParamsDto): Promise<RpcListResponse<NewsEntity>> {
    const [items, totalCount] = await this.repository.getList(params)

    return {
      data: items,
      meta: {
        total: totalCount,
      },
    }
  }

  async getItemById(id: string): Promise<RpcResponse<NewsRequestDto>> {
    const news = await this.repository.findById(id)

    return { data: this.newsDataMapper.toSearchResult(news) }
  }

  async createItem(newsData: NewsRequestDto): Promise<{ data: NewsEntity }> {
    const news = await this.repository.create(newsData)

    return { data: news }
  }

  async updateItem(id: string, newsData: NewsRequestDto): Promise<RpcResponse<NewsEntity>> {
    const normalizedNewsData = this.newsDataMapper.toEntity(newsData)
    const news = await this.repository.update(id, normalizedNewsData)

    return { data: news }
  }

  async deleteItem(id: string): Promise<RpcResponse<NewsEntity>> {
    const news = await this.repository.delete(id)

    return { data: news }
  }
}
