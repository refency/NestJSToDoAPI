import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user/user.service';

@ApiTags('User API')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Get user with books which it rent
  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'Get user by id',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  getUser(@Param('id') id: string): Promise<{ [key: string]: any }> {
    return this.userService.findOne(id);
  }

  // Get list with all users
  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get list of all users',
    type: User,
  })
  getUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  // Change status of pass
  @Get('/pass/:id')
  @ApiResponse({
    status: 200,
    description: 'User has get pass',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  changePass(@Param('id') id: string): Promise<User> {
    return this.userService.change(id);
  }

  // Create user
  @Post()
  @ApiResponse({
    status: 200,
    description: 'User has been created',
    type: User,
  })
  @ApiBody({ type: User })
  createUser(@Body() user: User): Promise<User> {
    return this.userService.create(user);
  }

  // Edit user by id
  @Put(':id')
  @ApiResponse({
    status: 200,
    description: 'User has been changed',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  async editUser(@Param('id') id: string, @Body() user: User): Promise<User> {
    return this.userService.update(id, user);
  }

  // Delete user by id
  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Delete user',
  })
  @ApiResponse({
    status: 404,
    description: 'Not Found',
  })
  async deleteUser(@Param('id') id: string) {
    await this.userService.remove(id);

    return 'User has been deleted';
  }
}
