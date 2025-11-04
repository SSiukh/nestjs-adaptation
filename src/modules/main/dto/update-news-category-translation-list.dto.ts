import { Expose } from 'class-transformer'
import { IsOptional, IsString, IsUUID } from 'class-validator'

export class UpdateNewsCategoryTranslationListDto {
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
