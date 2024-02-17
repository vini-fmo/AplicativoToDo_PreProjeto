import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/PrismaService';
import { usersDTO } from './users.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: usersDTO) {
    const user = await this.prisma.user.create({
      data,
    });
    return user;
  }

  async update(id: number, data: usersDTO) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
    });
    return user;
  }
}
