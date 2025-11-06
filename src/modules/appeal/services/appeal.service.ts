import { Inject, Injectable } from '@nestjs/common'
import { AppealRepositoryToken } from 'src/modules/appeal/datasets'
import { AppealEntity } from 'src/modules/appeal/entities'
import { IAppealRepository } from 'src/modules/appeal/types'

import { RpcResponse } from 'src/core/interfaces/rpc'

import { CreateAppealRequestDto } from 'src/modules/appeal/dto/requests'

@Injectable()
export class AppealService {
  constructor(
    @Inject(AppealRepositoryToken)
    private readonly appealRepository: IAppealRepository,
  ) {}

  async createAppeal(appealData: CreateAppealRequestDto): Promise<RpcResponse<AppealEntity>> {
    const appeal = await this.appealRepository.create(appealData)

    return {
      data: appeal,
    }
  }
}
