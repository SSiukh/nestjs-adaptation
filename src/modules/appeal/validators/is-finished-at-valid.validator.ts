import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'

import { CreateAppealRequestDto } from 'src/modules/appeal/dto/requests'

@ValidatorConstraint()
export class IsFinishedAtConstraint implements ValidatorConstraintInterface {
  validate(value: string, validationArguments?: ValidationArguments): boolean {
    const obj = <CreateAppealRequestDto>validationArguments.object
    const type = obj.type

    const date = new Date(value)
    const now = new Date()
    if (isNaN(date.getTime())) {
      return false
    }

    const minDate = new Date(now.getFullYear() - (type === 'revalidation' ? 2 : 1), now.getMonth(), now.getDate())

    obj.finishedAt = date.toISOString()

    return date >= minDate
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be a valid date`
  }
}

export function IsFinishedAtValid(validationOptions?: ValidationOptions): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    registerDecorator({
      target: target.constructor,
      propertyName: <string>propertyKey,
      options: validationOptions,
      validator: IsFinishedAtConstraint,
    })
  }
}
