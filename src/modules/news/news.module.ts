import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NewsController } from './controllers/news.contoller'
import { NewsRepositoryToken } from './datasets'
import { NewsEntity } from './entities'
import { NewsDataMapper } from './mappers/news.data-mapper'
import { NewsRepository } from './repositories/news.repository'
import { NewsService } from './services/news.service'

@Module({
  imports: [TypeOrmModule.forFeature([NewsEntity])],
  controllers: [NewsController],
  providers: [NewsService, NewsDataMapper, { provide: NewsRepositoryToken, useClass: NewsRepository }],
})
export class NewsModule {}
