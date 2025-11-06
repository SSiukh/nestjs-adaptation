import { NewsCategoryEntity } from 'src/modules/news-category/entities'

import { IBaseCrud } from 'src/core/types'

export interface INewsCategoryRepository extends IBaseCrud<NewsCategoryEntity> {
  getReferences(): Promise<NewsCategoryEntity[]>
}
