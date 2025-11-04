import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm/repository/Repository'

import { RpcListResponse, RpcResponse } from 'src/core/interfaces/rpc'

import { CategoryListQueryParamsDto } from 'src/modules/main/dto/params/category-list.query-params.dto'
import { NewsCategoryDto } from 'src/modules/main/dto/requests/news-category.request.dto'

import { NewsCategoryEntity } from 'src/modules/main/entities/news-category.entity'

@Injectable()
export class NewsCategoryService {
  constructor(@InjectRepository(NewsCategoryEntity) private categoryRepository: Repository<NewsCategoryEntity>) {}

  async getReferenceList(): Promise<RpcResponse<NewsCategoryEntity[]>> {
    const categories = await this.categoryRepository.find({
      where: {
        isPublished: true,
      },
    })

    return {
      data: categories,
    }
  }

  async getList(params: CategoryListQueryParamsDto): Promise<RpcListResponse<NewsCategoryEntity>> {
    const query = this.categoryRepository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.translationList', 'translation')
      .where('category.isPublished = :isPublished', { isPublished: true })

    if (params.searchTerm) {
      query.andWhere('("translation"."title" ILIKE :searchTerm)', {
        searchTerm: `%${params.searchTerm}%`,
      })
    }

    if (params.sortColumn && params.sortDirection) {
      if (params.sortColumn === 'title') {
        query.orderBy('translation.title', params.sortDirection)
      } else {
        query.orderBy(`category.${params.sortColumn}`, params.sortDirection)
      }
    }

    query.skip((Number(params.page) - 1) * Number(params.pageSize)).take(Number(params.pageSize))

    const [items, totalCount] = await query.getManyAndCount()

    return {
      data: items,
      meta: {
        total: totalCount,
      },
    }
  }

  async getItem(id: string): Promise<RpcResponse<NewsCategoryEntity>> {
    const category = await this.categoryRepository.findOne({
      where: {
        id,
      },
    })

    if (!category) {
      throw new NotFoundException(`Category with id: ${id} not found`)
    }

    return { data: category }
  }

  async createItem(categoryData: NewsCategoryDto): Promise<RpcResponse<NewsCategoryEntity>> {
    const createdCategory = this.categoryRepository.create(categoryData)

    const category = await this.categoryRepository.save(createdCategory)

    return {
      data: category,
    }
  }

  async updateItem(id: string, categoryData: NewsCategoryDto): Promise<RpcResponse<NewsCategoryEntity>> {
    const updatedCategory = await this.categoryRepository.preload({
      id,
      ...categoryData,
    })

    if (!updatedCategory) {
      throw new NotFoundException(`Category with id ${id} not found`)
    }

    if (categoryData.isPublished) {
      updatedCategory.publishedAt = new Date()
    } else {
      updatedCategory.publishedAt = null
    }

    await this.categoryRepository.save(updatedCategory)

    return { data: updatedCategory }
  }

  async deleteItem(id: string): Promise<RpcResponse<NewsCategoryEntity>> {
    const category = await this.categoryRepository.findOne({ where: { id } })

    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`)
    }

    await this.categoryRepository.remove(category)

    return { data: category }
  }
}
