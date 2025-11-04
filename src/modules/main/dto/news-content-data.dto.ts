import { Expose } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class NewsContentDataDto {
  @IsOptional()
  @Expose()
  @IsString()
  htmlText?: string
}
