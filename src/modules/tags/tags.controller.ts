/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Controller, Get, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  async create(data: Prisma.TagCreateInput) {
    return this.tagsService.create(data);
  }

  @Get()
  async findAll() {
    return this.tagsService.findAll();
  }

  async findOne(id: number){
    return this.tagsService.findOne(id);
  }

  async findTasksByTag(tagId: number){
    return this.tagsService.findTasksByTag(tagId);

  @Patch()
  async update(id: number, data: Prisma.TagUpdateInput) {
    return this.tagsService.update(id, data);
  }
}
