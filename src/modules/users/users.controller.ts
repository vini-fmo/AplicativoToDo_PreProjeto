import { Body, Controller, Delete, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() data: Prisma.UserCreateInput) {
    try {
      await this.usersService.create(data);
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Patch(":id")
  async update(@Param('id') id: number, @Body() data: Prisma.UserUpdateInput) {
    try {
      await this.usersService.update(id, data);
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Delete(":id")
  async remove(@Param('id') id: number) {
    try {
      await this.usersService.remove(id);
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }
}
