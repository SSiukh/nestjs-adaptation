import { Expose } from 'class-transformer'
import { IsOptional, IsString, IsUUID } from 'class-validator'

export class NewsCategoryTranslationListDto {
  @IsUUID()
  @Expose()
  categoryTranslationId: string

  @IsString()
  @Expose()
  lang: string

  @IsOptional()
  @IsString()
  @Expose()
  title: string
}
