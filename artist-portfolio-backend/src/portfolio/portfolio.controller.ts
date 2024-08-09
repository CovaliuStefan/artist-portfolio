import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  getAllWorks() {
    return this.portfolioService.getAllWorks();
  }

  @Post()
  addWork(@Body() work) {
    return this.portfolioService.addWork(work);
  }

  @Put(':id')
  updateWork(@Param('id') id: string, @Body() updatedWork) {
    return this.portfolioService.updateWork(id, updatedWork);
  }

  @Delete(':id')
  deleteWork(@Param('id') id: string) {
    return this.portfolioService.deleteWork(id);
  }
}
