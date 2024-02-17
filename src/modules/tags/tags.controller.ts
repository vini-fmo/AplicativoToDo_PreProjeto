/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async Create(@Body() data: Prisma.TagCreateInput) {
    try {
      const tag = await this.tagsService.create(data);
      return tag;
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }
    
  @Get(":id")
  async FindOne(@Param('id') id: string) {
    try {
      const tag = await this.tagsService.findOne(Number(id));
      return tag;
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  async FindtasksByTag(@Param('id') id: string){
    try {
      const tasks = await this.tagsService.findTasksByTag(Number(id));
      return tasks;
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Get()
  async FindAll() {
    try {
      return await this.tagsService.findAll();
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Patch(":id")
  async Update(@Param('id') id: string, @Body() data: Prisma.TagUpdateInput) {
    try {
      return await this.tagsService.update(Number(id) , data);
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Delete(":id")
  async Remove(@Param('id') id: string) {
    try {
      return await this.tagsService.remove(Number(id));
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }
}
