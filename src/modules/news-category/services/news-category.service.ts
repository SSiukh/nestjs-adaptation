import { Inject, Injectable } from '@nestjs/common'
import { NewsCategoryRepositoryToken } from 'src/modules/news-category/datasets'
import { NewsCategoryEntity } from 'src/modules/news-category/entities'
import { INewsCategoryRepository } from 'src/modules/news-category/types'

import { RpcListResponse, RpcResponse } from 'src/core/interfaces/rpc'

import { CategoryListQueryParamsDto } from 'src/modules/news-category/dto/query-params'
import { NewsCategoryDto } from 'src/modules/news-category/dto/requests'

@Injectable()
export class NewsCategoryService {
  constructor(
    @Inject(NewsCategoryRepositoryToken)
    private readonly repository: INewsCategoryRepository,
  ) {}

  async getReferenceList(): Promise<RpcResponse<NewsCategoryEntity[]>> {
    const categories = await this.repository.getReferences()

    return {
      data: categories,
    }
  }

  async getList(params: CategoryListQueryParamsDto): Promise<RpcListResponse<NewsCategoryEntity>> {
    const [items, totalCount] = await this.repository.getList(params)

    return {
      data: items,
      meta: {
        total: totalCount,
      },
    }
  }

  async getItem(id: string): Promise<RpcResponse<NewsCategoryEntity>> {
    const category = await this.repository.findById(id)

    return { data: category }
  }

  async createItem(categoryData: NewsCategoryDto): Promise<RpcResponse<NewsCategoryEntity>> {
    const category = await this.repository.create(categoryData)

    return {
      data: category,
    }
  }

  async updateItem(id: string, categoryData: NewsCategoryDto): Promise<RpcResponse<NewsCategoryEntity>> {
    if (categoryData.isPublished) {
      categoryData.publishedAt = new Date()
    } else {
      categoryData.publishedAt = null
    }

    const updatedCategory = await this.repository.update(id, categoryData)

    return { data: updatedCategory }
  }

  async deleteItem(id: string): Promise<RpcResponse<NewsCategoryEntity>> {
    const category = await this.repository.delete(id)

    return { data: category }
  }
}
