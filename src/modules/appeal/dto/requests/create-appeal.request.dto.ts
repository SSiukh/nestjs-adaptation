import { Expose } from 'class-transformer'
import { IsEmail, IsEnum, IsNumber, IsString } from 'class-validator'
import { Type } from 'src/modules/appeal/datasets'
import { AppealEntity } from 'src/modules/appeal/entities'
import { IsFinishedAtValid, IsIpnValid, IsValidAgeByIpn } from 'src/modules/appeal/validators'
import { IsUnique } from 'src/shared/validators'

import { GenericDto } from 'src/core/abstracts/generic.dto'

export class CreateAppealRequestDto extends GenericDto {
  @IsEmail({}, { message: 'Email must be a valid address' })
  @IsUnique(AppealEntity, 'email')
  @Expose()
  email: string

  @Expose()
  @IsFinishedAtValid()
  finishedAt: string

  @IsEnum(Type)
  @Expose()
  type: Type

  @IsString()
  @Expose()
  @IsIpnValid()
  @IsUnique(AppealEntity, 'ipn')
  ipn: string

  @IsNumber()
  @IsValidAgeByIpn('ipn')
  @Expose()
  age: number
}
