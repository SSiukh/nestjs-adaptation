import { Body, Controller, Delete, Get, Logger, Param, Post, Put, Query, ValidationPipe } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { RpcResponse } from 'src/core/interfaces/rpc'

import { NewsListQueryParamsDto } from 'src/modules/news/dto/params/news-list.query-params.dto'
import { NewsRequestDto } from 'src/modules/news/dto/requests'

import { NewsEntity } from 'src/modules/news/entities/news.entity'

import { NewsService } from 'src/modules/news/services/news.service'

@ApiTags('News')
@Controller('news')
export class NewsController {
  private readonly logger = new Logger(NewsController.name)

  constructor(private readonly newsService: NewsService) {}

  @Get('list')
  async getList(
    @Query(new ValidationPipe({ transform: true })) params?: NewsListQueryParamsDto,
  ): Promise<{ data: NewsEntity[] }> {
    this.logger.log('GET: news/list', { params })

    return await this.newsService.getList(params)
  }

  @Get('item/:id')
  async getItem(@Param('id') id: string): Promise<RpcResponse<NewsRequestDto>> {
    this.logger.log('GET: news/item/:id', { id })

    return await this.newsService.getItemById(id)
  }

  @Post('item')
  async createItem(@Body() news: NewsRequestDto): Promise<RpcResponse<NewsEntity>> {
    this.logger.log('POST: news/item', { news })

    return await this.newsService.createItem(news)
  }

  @Put('item/:id')
  async updateItem(@Param('id') id: string, @Body() news: NewsRequestDto): Promise<RpcResponse<NewsEntity>> {
    this.logger.log('PUT: news/item/:id ', { news, id })

    return await this.newsService.updateItem(id, news)
  }

  @Delete('item/:id')
  async deleteItem(@Param('id') id: string): Promise<RpcResponse<NewsEntity>> {
    this.logger.log('DELETE: news/item', { id })

    return await this.newsService.deleteItem(id)
  }
}
