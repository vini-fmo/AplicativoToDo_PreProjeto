/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(@Body() data: Prisma.TagCreateInput) {
    try {
      await this.tagsService.create(data);
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
  async findOne(@Param('id') id: number) {
    try {
      await this.tagsService.findOne(id);
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  async findTasksByTag(@Param('id') id: number){
    try {
      await this.tagsService.findTasksByTag(id);
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
  async findAll() {
    try {
      await this.tagsService.findAll();
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
  async update(@Param('id') id: number, @Body() data: Prisma.TagUpdateInput) {
    try {
      await this.tagsService.update(id, data);
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
  async remove(@Param('id') id: number) {
    try {
      await this.tagsService.remove(id);
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
