import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../database/PrismaService';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const user = await this.prisma.user.create({
      data,
    });
    if (data.name === null) {
      throw new Error(`User name is required.`);
    }
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    if (!users) {
      throw new Error(`No users found.`);
    }
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new Error(`User with id ${id} not found.`);
    }
    return user;
  }

  async findAllTasksByUser(userId: number) {
    const tasks = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        tasks: true,
      },
    });
    if (!tasks) {
      throw new Error(`User with id ${userId} not found.`);
    }
    else if (tasks.tasks.length === 0) {
      throw new Error(`No tasks found for user with id ${userId}.`);
    }
    return tasks.tasks;
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    if (!user) {
      throw new Error(`User with id ${id} not found.`);
    }
    else if (data.name === null) {
      throw new Error(`User name is required.`);
    }
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: { id },
    });
    if (!user) {
      throw new Error(`User with id ${id} not found.`);
    }
    return user;
  }
}
