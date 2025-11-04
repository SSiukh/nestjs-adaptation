import { Injectable } from '@nestjs/common'

import { UpdateNewsDto } from 'src/modules/main/dto/requests'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

@Injectable()
export class NewsDataMapper {
  toSearchResult(entity: NewsEntity): UpdateNewsDto {
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

  toEntity(dto: UpdateNewsDto): NewsEntity {
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
