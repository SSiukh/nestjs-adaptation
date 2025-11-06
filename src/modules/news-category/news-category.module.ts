import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NewsCategoryController } from './controllers/news-category.controller'
import { NewsCategoryRepositoryToken } from './datasets'
import { NewsCategoryEntity } from './entities'
import { NewsCategoryRepository } from './repositories/news-category.repository'
import { NewsCategoryService } from './services/news-category.service'

@Module({
  imports: [TypeOrmModule.forFeature([NewsCategoryEntity])],
  controllers: [NewsCategoryController],
  providers: [NewsCategoryService, { provide: NewsCategoryRepositoryToken, useClass: NewsCategoryRepository }],
})
export class NewsCategoryModule {}
