import { Injectable } from '@nestjs/common'
import { DeepPartial } from 'typeorm'

import { NewsRequestDto } from 'src/modules/news/dto/requests'

import { NewsEntity } from 'src/modules/news/entities/news.entity'

@Injectable()
export class NewsDataMapper {
  toSearchResult(entity: NewsEntity): NewsRequestDto {
    const { newsCategory, publishedHour, publishedMinute, publishedSecond, translationList, ...restData } = entity

    return {
      ...restData,
      newsCategory,
      publishedAtTime: {
        hour: publishedHour,
        minute: publishedMinute,
        second: publishedSecond,
      },
      translationList: translationList.map(
        ({
          htmlContent,
          metaDescription,
          metaKeywords,
          ogDescription,
          ogImageUrl,
          metaTitle,
          ogTitle,
          ...translationData
        }) => ({
          ...translationData,
          contentData: {
            htmlText: htmlContent,
          },
          metaData: {
            description: metaDescription,
            keywords: metaKeywords,
            title: metaTitle,
            ogDescription,
            ogTitle,
            ogImageUrl,
          },
        }),
      ),
    }
  }

  toEntity(dto: NewsRequestDto): DeepPartial<NewsEntity> {
    const { publishedAtTime, newsCategory, translationList, ...restData } = dto

    return {
      ...restData,
      newsCategory,
      publishedHour: publishedAtTime.hour,
      publishedMinute: publishedAtTime.minute,
      publishedSecond: publishedAtTime.second,
      translationList: translationList.map(
        ({
          contentData,
          metaData: { description, keywords, title, ogDescription, ogImageUrl, ogTitle },
          ...restTranslationData
        }) => ({
          ...restTranslationData,
          htmlContent: contentData.htmlText,
          metaDescription: description,
          metaKeywords: keywords,
          ogDescription,
          ogImageUrl,
          metaTitle: title,
          ogTitle,
        }),
      ),
    }
  }
}
