import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { tagsDTO } from './tags.dto';

@Injectable()
export class TagsService {
  constructor(private prisma: PrismaService) {}

  async create(data: tagsDTO) {
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

  async update(id: number, data: tagsDTO) {
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

  async findAllTasksByTagId(taskId: number) {
    const tasks = await this.prisma.task.findMany({
      where: {
        tags: {
          some: {
            id: taskId,
          },
        },
      },
    });
  }
}
