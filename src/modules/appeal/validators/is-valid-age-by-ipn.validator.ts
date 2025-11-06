import { Injectable } from '@nestjs/common'
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'

@ValidatorConstraint()
@Injectable()
export class IsValidAgeConstraint implements ValidatorConstraintInterface {
  async validate(value: number, args: ValidationArguments): Promise<boolean> {
    const obj = args.object
    const [field] = args.constraints
    const controlDate = new Date(1899, 11, 31)
    const now = new Date()

    if (!obj[field]) {
      throw new Error(`Dto instance doesn't have a property with name ${field}`)
    }

    const birthDate = new Date(controlDate)

    birthDate.setDate(birthDate.getDate() + Number(obj[field].slice(0, 5)))

    let age = now.getFullYear() - birthDate.getFullYear()
    if (
      now.getMonth() < birthDate.getMonth() ||
      (now.getMonth() === birthDate.getMonth() && now.getDate() < birthDate.getDate())
    ) {
      age--
    }

    return age === value
  }

  defaultMessage(args: ValidationArguments): string {
    const [field] = args.constraints

    return `Age does not match the date of birth in ${field}`
  }
}

export function IsValidAgeByIpn(field: string, validationOptions?: ValidationOptions): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    registerDecorator({
      target: target.constructor,
      propertyName: <string>propertyKey,
      options: validationOptions,
      constraints: [field],
      validator: IsValidAgeConstraint,
    })
  }
}
