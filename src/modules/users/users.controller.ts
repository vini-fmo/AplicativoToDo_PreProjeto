import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async Create(@Body() data: Prisma.UserCreateInput) {
    try {
      return await this.usersService.create(data);
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Get()
  async FindAll() {
    try {
      return await this.usersService.findAll();
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }

  @Get(":id")
  async FindOne(@Param('id') id: string) {
    try {
      return await this.usersService.findOne(Number(id));
    } catch (error) { 
      throw new HttpException({
        status: HttpStatus.FORBIDDEN,
        error: error.message,
      }, HttpStatus.FORBIDDEN, {
        cause: error
      });
    }
  }


  @Get("tasks/:id")
  async FindTasksByUser(@Param('id') id: string) {
    try {
      return await this.usersService.findAllTasksByUser(Number(id));
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
  async Update(@Param('id') id: string, @Body() data: Prisma.UserUpdateInput) {
    try {
      return await this.usersService.update(Number(id), data);
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
  async Remove(@Param('id') id: string) {
    try {
      return await this.usersService.remove(Number(id));
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
