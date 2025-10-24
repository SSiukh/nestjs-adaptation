import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NewsController } from './controllers/news.contoller'
import { NewsDataMapper } from './data-mappers/news.data-mapper'
import { NewsEntity } from './entities/news.entity'
import { NewsService } from './services/news.service'

import { ProjectEntity } from 'src/modules/main/entities/project.entity'

import { AppController } from 'src/modules/main/controllers/app.controller'
import { ProjectController } from 'src/modules/main/controllers/project.controller'

import { ProjectService } from 'src/modules/main/services/project.service'

import { ProjectDataMapper } from 'src/modules/main/data-mappers/project.data-mapper'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, NewsEntity]), ScheduleModule.forRoot()],
  controllers: [AppController, ProjectController, NewsController],
  providers: [ProjectService, ProjectDataMapper, NewsService, NewsDataMapper],
})
export class MainModule {}
