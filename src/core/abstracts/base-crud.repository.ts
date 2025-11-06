import { NotFoundException } from '@nestjs/common'
import { DeepPartial, FindOptionsOrder, FindOptionsWhere, Repository, SelectQueryBuilder } from 'typeorm'

import { ListQueryParamsDto } from './list-query-params.dto'

import { IBaseCrud } from 'src/core/types'

export abstract class BaseCrudRepository<T extends { id: string }> implements IBaseCrud<T> {
  protected constructor(protected readonly repository: Repository<T>) {}

  async getList(params: Partial<ListQueryParamsDto>): Promise<[T[], number]> {
    const { page = 1, pageSize = 10, sortColumn = 'createdAt', sortDirection = 'DESC' } = params

    return await this.repository.findAndCount({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: <FindOptionsOrder<T>>{ [sortColumn]: sortDirection },
    })
  }

  async findById(id: string): Promise<T> {
    const item = await this.repository.findOne({ where: <FindOptionsWhere<T>>{ id } })
    if (!item) {
      throw new NotFoundException(`Entity with id ${id} not found`)
    }

    return item
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data)

    return await this.repository.save(entity)
  }

  async update(id: string, data: DeepPartial<T>): Promise<T> {
    const entity = await this.repository.preload({ id, ...data })

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`)
    }

    return await this.repository.save(entity)
  }

  async delete(id: string): Promise<T> {
    const entity = await this.findById(id)

    if (!entity) {
      throw new NotFoundException(`Entity with id ${id} not found`)
    }

    await this.repository.remove(entity)

    return entity
  }

  protected applyLangFilter(
    query: SelectQueryBuilder<T>,
    aliases: string | string[],
    lang?: string,
  ): SelectQueryBuilder<T> {
    if (!lang) {
      return query
    }

    const aliasList = Array.isArray(aliases) ? aliases : [aliases]

    aliasList.forEach((alias) => {
      query.andWhere(`${alias}.lang = :lang`, { lang })
    })

    return query
  }

  protected applySearchFilter(
    query: SelectQueryBuilder<T>,
    alias: string,
    searchTerm?: string,
    columns: string[] = ['title'],
  ): SelectQueryBuilder<T> {
    if (searchTerm) {
      const conditions = columns.map((col) => `"${alias}"."${col}" ILIKE :searchTerm`).join(' OR ')

      query.andWhere(`(${conditions})`, { searchTerm: `%${searchTerm}%` })
    }

    return query
  }

  protected applyPagination(query: SelectQueryBuilder<T>, page?: number, pageSize?: number): SelectQueryBuilder<T> {
    const p = page && page > 0 ? page : 1
    const ps = pageSize && pageSize > 0 ? pageSize : 10

    return query.skip((p - 1) * ps).take(ps)
  }
}
