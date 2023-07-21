import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  async createUser(input: CreateUserDto) {
    const createdUser = await this.prismaService.user.create({
      data: {
        ...input,
      },
    });
    return createdUser;
  }

  async getUserById(id: number): Promise<User> {
    const foundUser = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!foundUser) {
      throw new BadRequestException('user with this id did not found');
    }
    return foundUser;
  }
}
