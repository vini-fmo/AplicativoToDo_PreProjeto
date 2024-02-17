import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { tasksDTO } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(data: tasksDTO) {
    const book = await this.prisma.task.create({
      data,
    });
    return book;
  }

  async findAll() {
    const tasks = await this.prisma.task.findMany();
    return tasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    return task;
  }

  async update(id: number, data: tasksDTO) {
    const task = await this.prisma.task.update({
      where: { id },
      data,
    });
    return task;
  }

  async remove(id: number) {
    const task = await this.prisma.task.delete({
      where: { id },
    });
    return task;
  }

  async removeAllCompleted() {
    const tasks = await this.prisma.task.deleteMany({
      where: { completed: true },
    });
    return tasks;
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
    return tasks;
  }
}
