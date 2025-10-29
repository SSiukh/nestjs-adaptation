import { NewsCategoryEntity } from 'src/modules/main/entities/news-category.entity'
import { NewsTranslationEntity } from 'src/modules/main/entities/news-translation.entity'

export interface NewsToListItem {
  isPublished: boolean
  translations: NewsTranslationEntity[]
  category: NewsCategoryEntity
}
