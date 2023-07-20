import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsUrl } from 'class-validator';

@InputType('CreateUserDto')
export class CreateUserDto {
  @IsString()
  @Field({ nullable: true })
  name: string;

  @IsString()
  @Field({ nullable: true })
  phonenumber: string;

  @IsUrl()
  @Field({ nullable: true })
  email: string;

  @IsString()
  @Field({ nullable: true })
  username: string;
}
