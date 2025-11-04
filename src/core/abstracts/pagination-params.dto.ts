import { Transform } from 'class-transformer'
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export abstract class PaginationParamsDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value) || 1)
  @Min(1)
  page?: number

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value) || 10)
  @Min(1)
  pageSize?: number

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value?.trim() ? value : 'createdAt'))
  sortColumn?: string

  @IsOptional()
  @Transform(({ value }) => {
    const dir = value?.toUpperCase()

    return dir === 'ASC' || dir === 'DESC' ? dir : 'DESC'
  })
  @IsEnum(['ASC', 'DESC'])
  sortDirection: 'ASC' | 'DESC'
}
