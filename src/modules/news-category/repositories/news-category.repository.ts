import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { NewsCategoryEntity } from 'src/modules/news-category/entities'
import { INewsCategoryRepository } from 'src/modules/news-category/types'
import { Repository } from 'typeorm'

import { BaseCrudRepository } from 'src/core/abstracts'

import { CategoryListQueryParamsDto } from 'src/modules/news-category/dto/query-params'

@Injectable()
export class NewsCategoryRepository extends BaseCrudRepository<NewsCategoryEntity> implements INewsCategoryRepository {
  constructor(
    @InjectRepository(NewsCategoryEntity)
    repository: Repository<NewsCategoryEntity>,
  ) {
    super(repository)
  }

  async getReferences(): Promise<NewsCategoryEntity[]> {
    return await this.repository.find({
      where: {
        isPublished: true,
      },
    })
  }

  async getList(params: CategoryListQueryParamsDto): Promise<[NewsCategoryEntity[], number]> {
    const query = this.repository
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.translationList', 'translation')
      .where('category.isPublished = :isPublished', { isPublished: true })

    this.applySearchFilter(query, 'translation', params.searchTerm, ['title'])

    if (params.sortColumn && params.sortDirection) {
      if (params.sortColumn === 'title') {
        query.orderBy('translation.title', params.sortDirection)
      } else {
        query.orderBy(`category.${params.sortColumn}`, params.sortDirection)
      }
    }

    this.applyPagination(query, Number(params.page), Number(params.pageSize))

    return await query.getManyAndCount()
  }
}
