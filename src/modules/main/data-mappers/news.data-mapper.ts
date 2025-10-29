import { Injectable } from '@nestjs/common'

import { NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

@Injectable()
export class NewsDataMapper {
  toSearchResult(entity: NewsEntity): NewsToListItem {
    const { isPublished, translations, category } = entity

    return {
      isPublished,
      translations,
      category,
    }
  }
}
