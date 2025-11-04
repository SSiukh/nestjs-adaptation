import { Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class CreateNewsTranslationListDto {
  @IsString()
  @Expose()
  lang: string

  @IsString()
  @Expose()
  @IsOptional()
  title?: string

  @IsString()
  @Expose()
  @IsOptional()
  description?: string

  @IsString()
  @Expose()
  @IsOptional()
  thumbnailUrl?: string
}
