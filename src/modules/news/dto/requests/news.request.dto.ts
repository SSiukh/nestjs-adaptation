import { Expose, Type } from 'class-transformer'
import { IsBoolean, IsDate, IsOptional, IsString, ValidateNested } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

import { NewsCategoryDto } from 'src/modules/news/dto/news-category.dto'
import { NewsPublishedAtTimeDto } from 'src/modules/news/dto/news-published-at-time.dto'
import { NewsTranslationListDto } from 'src/modules/news/dto/news-translation-list.dto'

export class NewsRequestDto extends GenericDto {
  @IsBoolean()
  @Expose()
  isPublished: boolean

  @IsString()
  @Expose()
  slug: string

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  @Expose()
  publishedAt?: Date

  @IsOptional()
  @Type(() => NewsPublishedAtTimeDto)
  @Expose()
  @ValidateNested()
  publishedAtTime?: NewsPublishedAtTimeDto

  @IsOptional()
  @Type(() => NewsCategoryDto)
  @Expose()
  @ValidateNested()
  newsCategory?: NewsCategoryDto

  @Type(() => NewsTranslationListDto)
  @Expose()
  @ValidateNested({ each: true })
  translationList?: NewsTranslationListDto[]
}
