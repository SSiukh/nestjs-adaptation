import { Transform } from 'class-transformer'
import { IsDate, IsOptional, IsString } from 'class-validator'

import { ListQueryParamsDto } from 'src/core/abstracts/list-query-params.dto'

export class NewsListQueryParamsDto extends ListQueryParamsDto {
  @IsOptional()
  @IsString()
  lang?: string

  @IsOptional()
  @IsString()
  newsCategory?: string

  @IsOptional()
  @IsString()
  searchTerm?: string

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate({ message: 'publishedBefore must be a valid date' })
  publishedBefore?: string

  @IsOptional()
  @Transform(({ value }) => (value ? new Date(value) : undefined))
  @IsDate({ message: 'publishedBefore must be a valid date' })
  publishedAfter?: string
}
