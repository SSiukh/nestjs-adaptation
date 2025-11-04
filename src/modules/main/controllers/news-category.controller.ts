import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { RpcListResponse, RpcResponse } from 'src/core/interfaces/rpc'

import { CategoryListQueryParamsDto } from 'src/modules/main/dto/params/category-list.query-params.dto'
import { NewsCategoryDto } from 'src/modules/main/dto/requests/news-category.request.dto'

import { NewsCategoryEntity } from 'src/modules/main/entities/news-category.entity'

import { NewsCategoryService } from 'src/modules/main/services/news-category.service'

@ApiTags('News category')
@Controller('news-category')
export class NewsCategoryController {
  constructor(private readonly categoryService: NewsCategoryService) {}

  @Get('reference')
  async getReferenceList(): Promise<RpcResponse<NewsCategoryEntity[]>> {
    return await this.categoryService.getReferenceList()
  }

  @Get('list')
  async getList(
    @Query(new ValidationPipe({ transform: true })) params: CategoryListQueryParamsDto,
  ): Promise<RpcListResponse<NewsCategoryEntity>> {
    return await this.categoryService.getList(params)
  }

  @Get('item/:id')
  async getItem(@Param('id') id: string): Promise<RpcResponse<NewsCategoryEntity>> {
    return await this.categoryService.getItem(id)
  }

  @Post('item')
  async createItem(@Body() category: NewsCategoryDto): Promise<RpcResponse<NewsCategoryEntity>> {
    return await this.categoryService.createItem(category)
  }

  @Put('item/:id')
  async updateItem(
    @Param('id') id: string,
    @Body() category: NewsCategoryDto,
  ): Promise<RpcResponse<NewsCategoryEntity>> {
    return await this.categoryService.updateItem(id, category)
  }

  @Delete('item/:id')
  async deleteItem(@Param('id') id: string): Promise<RpcResponse<NewsCategoryEntity>> {
    return await this.categoryService.deleteItem(id)
  }
}
