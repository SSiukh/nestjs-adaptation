import { AppealEntity } from 'src/modules/appeal/entities'

import { CreateAppealRequestDto } from 'src/modules/appeal/dto/requests'

export interface IAppealRepository {
  create(data: CreateAppealRequestDto): Promise<AppealEntity>
}
