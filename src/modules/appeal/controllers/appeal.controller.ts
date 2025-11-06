import { Body, Controller, Logger, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AppealEntity } from 'src/modules/appeal/entities'

import { RpcResponse } from 'src/core/interfaces/rpc'

import { CreateAppealRequestDto } from 'src/modules/appeal/dto/requests'

import { AppealService } from 'src/modules/appeal/services/appeal.service'

@ApiTags('Appeal')
@Controller('appeal')
export class AppealController {
  private readonly logger = new Logger(AppealController.name)

  constructor(private readonly appealService: AppealService) {}

  @Post('create')
  async createAppeal(@Body() appeal: CreateAppealRequestDto): Promise<RpcResponse<AppealEntity>> {
    this.logger.log('POST: appeal/create', { appeal })

    return await this.appealService.createAppeal(appeal)
  }
}
