import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';
import { tasksDTO } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(data: tasksDTO) { 
    const { name, completed, createdAt, updatedAt, tags } = data;
    
    const task = await this.prisma.task.create({
      data: {
        name,
        completed,
        createdAt,
        updatedAt,
      },
    });

    async function criaEOuConectaTagsInformadasATaskFornecida(task: tasksDTO, tags: string[]) {
      tags.forEach(async tag => {
        const TagThatExists = await this.prisma.tag.findFirst({
          where: { name: tag }
        });
        if ( !TagThatExists ) {
          const newTag = await this.prisma.tag.create({ data: { name: tag } });
          const relationTaskTags = await this.prisma.tagsOnTasks.create({ 
            data: { 
              task: { connect: { id: task.id } },
              tag: { connect: { id: newTag.id } }
            }
          })
          return relationTaskTags;
      } else { 
          const relationTaskTags = await this.prisma.tagsOnTasks.create({ 
            data: { 
              task: { connect: { id: task.id },
              tag: { connect: { id: TagThatExists.id } }}
            },
          });
          return relationTaskTags;
        }
      })
    }

    if (!data.name) {
      throw new Error(`Task title is required.`);
    } else if (tags) {
      criaEOuConectaTagsInformadasATaskFornecida(task, tags); // Se houver tags informadas, verifica se a tag existe e cria a relação entre a task e a tag ou cria a tag e a relação entre a task e a tag.
    }
    return task;
  }

  async findAll() {
    const tasks = await this.prisma.task.findMany();
    if (!tasks) {
      throw new Error(`No tasks found.`);
    }
    return tasks;
  }

  async findAllCompleted() {
    const tasks = await this.prisma.task.findMany({
      where: { completed: true },
    });
    if (!tasks) {
      throw new Error(`No completed tasks found.`);
    }
    return tasks;
  }

  async findAllUncompleted() {
    const tasks = await this.prisma.task.findMany({
      where: { completed: false },
    });
    if (!tasks) {
      throw new Error(`No uncompleted tasks found.`);
    }
    return tasks;
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({
      where: { id },
    });
    if (!task) {
      throw new Error(`Task with id ${id} not found.`);
    }
    return task;
  }

  async update(id: number, data: Prisma.TaskUpdateInput) {
    const task = await this.prisma.task.update({
      where: { id },
      data,
    });
    if (!task) {
      throw new Error(`Task with id ${id} not found.`);
    }
    else if (data.name === null) {
      throw new Error(`Task title is required.`);
    }
    return task;
  }

  async remove(id: number) {
    const task = await this.prisma.task.delete({
      where: { id },
    });
    if (!task) {
      throw new Error(`Task with id ${id} not found.`);
    }
    return task;
  }

  async removeAllCompleted() {
    const tasks = await this.prisma.task.deleteMany({
      where: { completed: true },
    });
    return tasks;
  }
}
