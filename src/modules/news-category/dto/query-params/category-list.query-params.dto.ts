import { IsOptional, IsString } from 'class-validator'

import { ListQueryParamsDto } from 'src/core/abstracts/list-query-params.dto'

export class CategoryListQueryParamsDto extends ListQueryParamsDto {
  @IsOptional()
  @IsString()
  searchTerm?: string
}
