import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'

@ValidatorConstraint()
export class IsIpnConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (!/^\d{10}$/.test(value)) {
      return false
    }

    const ipnArray = value.split('').map(Number)
    const contolMultiplier = [-1, 5, 7, 9, 4, 6, 10, 5, 7]

    const sum = ipnArray.slice(0, 9).reduce((acc, number, index) => {
      const multiplied = number * contolMultiplier[index]

      return acc + multiplied
    }, 0)

    const controlNumber = (sum % 11) % 10

    return ipnArray[ipnArray.length - 1] === controlNumber
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return `${validationArguments.property} must be a valid IPN`
  }
}

export function IsIpnValid(validationOptions?: ValidationOptions): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    registerDecorator({
      target: target.constructor,
      propertyName: <string>propertyKey,
      options: validationOptions,
      validator: IsIpnConstraint,
    })
  }
}
