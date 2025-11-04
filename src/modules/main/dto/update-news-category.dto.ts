import { Expose, Type } from 'class-transformer'
import { IsBoolean, IsDate, IsOptional, IsUUID, ValidateNested } from 'class-validator'

import { UpdateNewsCategoryTranslationListDto } from './update-news-category-translation-list.dto'

export class UpdateNewsCategoryDto {
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

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  @Expose()
  publishedAt?: Date

  @IsOptional()
  @Type(() => UpdateNewsCategoryTranslationListDto)
  @ValidateNested({ each: true })
  translationList: UpdateNewsCategoryTranslationListDto[]
}
