import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { IsUniqueConstraint } from 'src/shared/validators'

import { AppealController } from './controllers/appeal.controller'
import { AppealRepositoryToken } from './datasets'
import { AppealEntity } from './entities'
import { AppealRepository } from './repositories/appeal.repository'
import { AppealService } from './services/appeal.service'

@Module({
  imports: [TypeOrmModule.forFeature([AppealEntity])],
  controllers: [AppealController],
  providers: [AppealService, IsUniqueConstraint, { provide: AppealRepositoryToken, useClass: AppealRepository }],
})
export class AppealModule {}
