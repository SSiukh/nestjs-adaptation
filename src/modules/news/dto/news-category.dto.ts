import { Expose, Type } from 'class-transformer'
import { IsBoolean, IsDate, IsOptional, IsUUID, ValidateNested } from 'class-validator'

import { NewsCategoryTranslationListDto } from './news-category-translation-list.dto'

export class NewsCategoryDto {
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
  @Type(() => NewsCategoryTranslationListDto)
  @ValidateNested({ each: true })
  translationList: NewsCategoryTranslationListDto[]
}
