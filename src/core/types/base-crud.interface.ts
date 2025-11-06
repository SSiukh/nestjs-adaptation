import { DeepPartial } from 'typeorm'

import { ListQueryParamsDto } from 'src/core/abstracts'

export interface IBaseCrud<T> {
  getList(params: Partial<ListQueryParamsDto>): Promise<[T[], number]>
  findById(id: string): Promise<T>
  create(data: DeepPartial<T>): Promise<T>
  update(id: string, data: DeepPartial<T>): Promise<T>
  delete(id: string): Promise<T>
}
