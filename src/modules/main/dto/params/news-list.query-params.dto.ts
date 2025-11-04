import { Transform } from 'class-transformer'
import { IsDate, IsOptional, IsString } from 'class-validator'

import { PaginationParamsDto } from 'src/core/abstracts/pagination-params.dto'

export class NewsListQueryParamsDto extends PaginationParamsDto {
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
