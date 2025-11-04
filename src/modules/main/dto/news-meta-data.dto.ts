import { Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class NewsMetaDataDto {
  @IsOptional()
  @IsString()
  @Expose()
  description?: string

  @IsOptional()
  @IsString()
  @Expose()
  keywords?: string

  @IsOptional()
  @IsString()
  @Expose()
  title?: string

  @IsOptional()
  @IsString()
  @Expose()
  ogDescription: string

  @IsOptional()
  @IsString()
  @Expose()
  ogTitle: string

  @IsOptional()
  @IsString()
  @Expose()
  ogImageUrl: string
}
