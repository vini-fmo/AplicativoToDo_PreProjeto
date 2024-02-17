/*eslint-disable prettier/prettier*/
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { Prisma } from '@prisma/client';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TagCreateInput) {
    const tag = await this.prisma.tag.create({
      data,
    });
    return tag;
  }

  async findAll() {
    const tags = await this.prisma.tag.findMany();
    return tags;
  }

  async findOne(id: number) {
    const tag = await this.prisma.tag.findUnique({
      where: { id },
    });
    if (!tag) {
      throw new Error(`Tag with id ${id} not found.`);
    }
    return tag;
  }

  async findTasksByTag(tagId: number) {
    const tasks = await this.prisma.tag.findUnique({
      where: {
       id: tagId 
      },
      include: {
        tasks: true,
      },
    });
  
    if (!tasks) {
      throw new Error(`Tag with name ${tasks.name} not found.`);
    }
    else if (tasks.tasks.length === 0) {
      throw new Error(`No tasks found for tag with name ${tasks.name}.`);
    }
    
    return tasks.tasks;
  }

  async update(id: number, data: Prisma.TagUpdateInput) {
    const tag = await this.prisma.tag.update({
      where: { id },
      data,
    });

    if (!tag) {
      throw new Error(`Tag with id ${id} not found.`);
    }

    return tag;
  }

  async remove(id: number) {
    const tag = await this.prisma.tag.delete({
      where: { id },
    });

    if (!tag) {
      throw new Error(`Tag with id ${id} not found.`);
    }
    return tag;
  }
}
