import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AppealEntity } from 'src/modules/appeal/entities'
import { IAppealRepository } from 'src/modules/appeal/types'
import { Repository } from 'typeorm'

import { CreateAppealRequestDto } from 'src/modules/appeal/dto/requests'

@Injectable()
export class AppealRepository implements IAppealRepository {
  constructor(@InjectRepository(AppealEntity) private appealRepository: Repository<AppealEntity>) {}

  async create(data: CreateAppealRequestDto): Promise<AppealEntity> {
    const appeal = this.appealRepository.create(data)

    return await this.appealRepository.save(appeal)
  }
}
