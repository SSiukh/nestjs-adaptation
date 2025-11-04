import { Expose, Type } from 'class-transformer'
import { IsArray, IsBoolean, IsString, ValidateNested } from 'class-validator'

import { GenericDto } from 'src/core/abstracts/generic.dto'

import { CreateNewsTranslationListDto } from 'src/modules/main/dto/create-news-translation-list.dto'

export class CreateNewsDto extends GenericDto {
  @IsBoolean()
  @Expose()
  isPublished: boolean

  @IsString()
  @Expose()
  slug: string

  @IsArray()
  @Expose()
  @Type(() => CreateNewsTranslationListDto)
  @ValidateNested({ each: true })
  translationList: CreateNewsTranslationListDto[]
}
