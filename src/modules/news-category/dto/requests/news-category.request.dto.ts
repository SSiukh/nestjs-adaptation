import { Expose, Type } from 'class-transformer'
import { IsArray, IsBoolean, IsDate, IsOptional, ValidateNested } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

import { NewsCategoryTranslationListDto } from 'src/modules/news-category/dto/news-category-translation-list.dto'

export class NewsCategoryDto extends GenericDto {
  @IsBoolean()
  @Expose()
  isPublished: boolean

  @IsArray()
  @Expose()
  @Type(() => NewsCategoryTranslationListDto)
  @ValidateNested({ each: true })
  translationList: NewsCategoryTranslationListDto[]

  @Type(() => Date)
  @IsOptional()
  @IsDate()
  @Expose()
  publishedAt?: Date
}
