import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { RpcListResponse, RpcResponse } from 'src/core/interfaces/rpc'

import { CategoryListQueryParamsDto } from 'src/modules/news-category/dto/query-params'
import { NewsCategoryDto } from 'src/modules/news-category/dto/requests'

import { NewsCategoryEntity } from 'src/modules/news-category/entities/news-category.entity'

import { NewsCategoryService } from 'src/modules/news-category/services/news-category.service'

@ApiTags('News category')
@Controller('news-category')
export class NewsCategoryController {
  private readonly logger = new Logger(NewsCategoryController.name)

  constructor(private readonly categoryService: NewsCategoryService) {}

  @Get('reference')
  async getReferenceList(): Promise<RpcResponse<NewsCategoryEntity[]>> {
    this.logger.log('GET: news-category/reference')

    return await this.categoryService.getReferenceList()
  }

  @Get('list')
  async getList(
    @Query(new ValidationPipe({ transform: true })) params: CategoryListQueryParamsDto,
  ): Promise<RpcListResponse<NewsCategoryEntity>> {
    this.logger.log('GET: news-category/list', { params })

    return await this.categoryService.getList(params)
  }

  @Get('item/:id')
  async getItem(@Param('id') id: string): Promise<RpcResponse<NewsCategoryEntity>> {
    this.logger.log('GET: news-category/item/:id', { id })

    return await this.categoryService.getItem(id)
  }

  @Post('item')
  async createItem(@Body() category: NewsCategoryDto): Promise<RpcResponse<NewsCategoryEntity>> {
    this.logger.log('POST: news-category/item', { category })

    return await this.categoryService.createItem(category)
  }

  @Put('item/:id')
  async updateItem(
    @Param('id') id: string,
    @Body() category: NewsCategoryDto,
  ): Promise<RpcResponse<NewsCategoryEntity>> {
    this.logger.log('PUT: news-category/item/:id', { category, id })

    return await this.categoryService.updateItem(id, category)
  }

  @Delete('item/:id')
  async deleteItem(@Param('id') id: string): Promise<RpcResponse<NewsCategoryEntity>> {
    this.logger.log('DELETE: news-category/item/:id', { id })

    return await this.categoryService.deleteItem(id)
  }
}
