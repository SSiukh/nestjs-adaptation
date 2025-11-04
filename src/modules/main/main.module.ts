import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NewsCategoryController } from './controllers/news-category.controller'
import { NewsController } from './controllers/news.contoller'
import { NewsDataMapper } from './data-mappers/news.data-mapper'
import { NewsCategoryEntity } from './entities/news-category.entity'
import { NewsEntity } from './entities/news.entity'
import { NewsCategoryService } from './services/news-category.service'
import { NewsService } from './services/news.service'

import { ProjectEntity } from 'src/modules/main/entities/project.entity'

import { AppController } from 'src/modules/main/controllers/app.controller'
import { ProjectController } from 'src/modules/main/controllers/project.controller'

import { ProjectService } from 'src/modules/main/services/project.service'

import { ProjectDataMapper } from 'src/modules/main/data-mappers/project.data-mapper'

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, NewsEntity, NewsCategoryEntity]), ScheduleModule.forRoot()],
  controllers: [AppController, ProjectController, NewsController, NewsCategoryController],
  providers: [ProjectService, ProjectDataMapper, NewsService, NewsDataMapper, NewsCategoryService],
})
export class MainModule {}
