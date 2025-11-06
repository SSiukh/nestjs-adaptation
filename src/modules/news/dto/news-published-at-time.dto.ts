import { Expose } from 'class-transformer'
import { IsNumber, IsOptional } from 'class-validator'

export class NewsPublishedAtTimeDto {
  @IsNumber()
  @Expose()
  hour: number

  @IsNumber()
  @Expose()
  minute: number

  @IsOptional()
  @IsNumber()
  @Expose()
  second?: number
}
