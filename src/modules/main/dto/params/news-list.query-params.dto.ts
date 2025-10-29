import { Transform } from 'class-transformer'
import { IsDate, IsOptional, IsString } from 'class-validator'

export class NewsListQueryParamsDto {
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
