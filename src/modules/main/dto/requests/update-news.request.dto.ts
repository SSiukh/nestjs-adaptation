import { Expose, Type } from 'class-transformer'
import { IsBoolean, IsDate, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

import { NewsPublishedAtTimeDto } from 'src/modules/main/dto/news-published-at-time.dto'
import { NewsTranslationListDto } from 'src/modules/main/dto/news-translation-list.dto'
import { UpdateNewsCategoryDto } from 'src/modules/main/dto/update-news-category.dto'

export class UpdateNewsDto extends GenericDto {
  @Type(() => Date)
  @IsDate()
  @Expose()
  createdAt: Date

  @IsUUID()
  @Expose()
  id: string

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
  @Type(() => UpdateNewsCategoryDto)
  @Expose()
  @ValidateNested()
  newsCategory: UpdateNewsCategoryDto

  @Type(() => NewsTranslationListDto)
  @Expose()
  @ValidateNested({ each: true })
  translationList: NewsTranslationListDto[]
}
