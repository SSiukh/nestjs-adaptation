import { Expose, Type } from 'class-transformer'
import { IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator'

import { NewsContentDataDto } from './news-content-data.dto'
import { NewsMetaDataDto } from './news-meta-data.dto'

export class NewsTranslationListDto {
  @IsUUID()
  @Expose()
  @IsOptional()
  translationId?: string

  @IsString()
  @Expose()
  lang: string

  @IsOptional()
  @IsString()
  @Expose()
  thumbnailUrl: string

  @IsString()
  @Expose()
  title: string

  @IsOptional()
  @IsString()
  @Expose()
  description: string

  @Type(() => NewsContentDataDto)
  @Expose()
  @ValidateNested()
  contentData: NewsContentDataDto

  @Type(() => NewsMetaDataDto)
  @Expose()
  @ValidateNested()
  metaData: NewsMetaDataDto
}
