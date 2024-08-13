import { Controller, Get, Post, Put, Delete, Body, Param, UploadedFile, UseInterceptors, Query, Headers, ForbiddenException, NotFoundException } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  @Get()
  getAllWorks(@Query('username') username?: string) {
    if (username) {
      // Return all works by the specified user, including hidden works
      return this.portfolioService.getWorksByUser(username);
    } else {
      // Return all public works
      return this.portfolioService.getPublicWorks();
    }
  }

  @Get(':id')
  getWorkById(@Param('id') id: string, @Headers('username') username: string) {
    const work = this.portfolioService.getWorkById(id);

    if (!work) {
      throw new NotFoundException('Work not found');
    }

    // Check if the user is authorized to view/edit this work
    if (work.username !== username && work.visibility === 'hidden') {
      throw new ForbiddenException('You are not authorized to access this work');
    }

    return work;
  }

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.random() * 16 | 0).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  addWork(@Body() work, @UploadedFile() file) {
    work.image = file ? `/uploads/${file.filename}` : null;
    work.visibility = work.visibility || 'public';
    return this.portfolioService.addWork(work);
  }

  @Put(':id')
  updateWork(@Param('id') id: string, @Body() body, @Headers('username') username: string) {
    console.log('Received PUT request for ID:', id);
    console.log('Received body:', body);
    console.log('Received username:', username);
    if (!username) throw new Error('Unauthorized: Username is missing');
    return this.portfolioService.updateWork(id, body, username);
  }

  @Delete(':id')
  deleteWork(@Param('id') id: string, @Body() body) {
    return this.portfolioService.deleteWork(id, body.username);
  }
}
