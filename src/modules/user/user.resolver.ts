import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.model';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserDto) {
    return this.userService.createUser(input);
  }

  @Query(() => User)
  async getUser(@Args('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }
}
