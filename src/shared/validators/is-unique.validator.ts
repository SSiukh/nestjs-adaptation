import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator'
import { DataSource } from 'typeorm'

@ValidatorConstraint({ async: true })
@Injectable()
export class IsUniqueConstraint implements ValidatorConstraintInterface {
  constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

  async validate(value: string, args: ValidationArguments): Promise<boolean> {
    const [EntityClass, field] = args.constraints
    const repository = this.dataSource.getRepository(EntityClass)

    const existing = await repository.findOne({ where: { [field]: value } })

    return !existing
  }

  defaultMessage(args: ValidationArguments): string {
    const [, field] = args.constraints

    return `${field} must be unique. Duplicate value found.`
  }
}

export function IsUnique(EntityClass: object, field: string, validationOptions?: ValidationOptions): PropertyDecorator {
  return (target: object, propertyKey: string | symbol) => {
    registerDecorator({
      target: target.constructor,
      propertyName: <string>propertyKey,
      options: validationOptions,
      constraints: [EntityClass, field],
      validator: IsUniqueConstraint,
    })
  }
}
