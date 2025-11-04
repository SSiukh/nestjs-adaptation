import { Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class NewsCategoryTranslationListDto {
  @IsString()
  @Expose()
  lang: string

  @IsOptional()
  @IsString()
  @Expose()
  title?: string

  @IsOptional()
  @IsString()
  @Expose()
  description?: string
}
