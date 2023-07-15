import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUrl } from 'class-validator';

@ObjectType('search')
export class Search {
  @Field(() => ID)
  id: number;

  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  description: string;

  @IsUrl()
  @Field()
  url: string;
}
