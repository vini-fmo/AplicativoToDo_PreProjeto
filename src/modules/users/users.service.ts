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
