import { NewsTranslationEntity } from 'src/modules/main/entities/news-translation.entity'

export interface NewsToListItem {
  isPublished: boolean
  translations: NewsTranslationEntity[]
}
