import { Controller, Get, Param, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { NewsToListItem } from 'src/modules/main/interfaces/news'

import { NewsService } from 'src/modules/main/services/news.service'

@ApiTags('News')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/')
  async getList(@Query('lang') lang?: string): Promise<{ data: NewsToListItem[] }> {
    return await this.newsService.getList(lang)
  }

  @Get('/:id')
  async getItem(@Param('id') id: string, @Query('lang') lang?: string): Promise<{ data: NewsToListItem }> {
    return await this.newsService.getItemById(id, lang)
  }
}
