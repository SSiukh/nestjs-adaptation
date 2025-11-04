import { IsOptional, IsString } from 'class-validator'

import { PaginationParamsDto } from 'src/core/abstracts/pagination-params.dto'

export class CategoryListQueryParamsDto extends PaginationParamsDto {
  @IsOptional()
  @IsString()
  searchTerm?: string
}
