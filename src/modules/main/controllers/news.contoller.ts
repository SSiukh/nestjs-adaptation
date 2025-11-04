import { Body, Controller, Delete, Get, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { RpcResponse } from 'src/core/interfaces/rpc'

import { NewsListQueryParamsDto } from 'src/modules/main/dto/params/news-list.query-params.dto'
import { CreateNewsDto, UpdateNewsDto } from 'src/modules/main/dto/requests'

import { NewsEntity } from 'src/modules/main/entities/news.entity'

import { NewsService } from 'src/modules/main/services/news.service'

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('list')
  async getList(
    @Query(new ValidationPipe({ transform: true })) params?: NewsListQueryParamsDto,
  ): Promise<{ data: NewsEntity[] }> {
    return await this.newsService.getList(params)
  }

  @Get('item/:id')
  async getItem(@Param('id') id: string): Promise<RpcResponse<UpdateNewsDto>> {
    return await this.newsService.getItemById(id)
  }

  @Post('item')
  async createItem(@Body() news: CreateNewsDto): Promise<RpcResponse<NewsEntity>> {
    return await this.newsService.createItem(news)
  }

  @Put('item/:id')
  async updateItem(@Param('id') id: string, @Body() news: UpdateNewsDto): Promise<RpcResponse<NewsEntity>> {
    return await this.newsService.updateItem(id, news)
  }

  @Delete('item/:id')
  async deleteItem(@Param('id') id: string): Promise<RpcResponse<NewsEntity>> {
    return await this.newsService.deleteItem(id)
  }
}
