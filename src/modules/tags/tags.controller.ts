
import { Controller, Post } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Prisma } from '@prisma/client';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post(){
    async create(data: Prisma.TagCreateInput) {
      
    }
  }
}
