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
      throw new Error(`Tag with name ${} not found.`);
    }
  
    return tasks.tasks;
  }

  async update(id: number, data: Prisma.TagUpdateInput) {
    const tag = await this.prisma.tag.update({
      where: { id },
      data,
    });
    return tag;
  }

  async remove(id: number) {
    const tag = await this.prisma.tag.delete({
      where: { id },
    });
    return tag;
  }
}
