import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsUrl, IsOptional } from 'class-validator';

@ObjectType('search')
export class Search {
  @Field(() => ID, { nullable: true })
  id: number;

  @IsString()
  @Field({ nullable: true })
  title: string;

  @IsString()
  @Field({ nullable: true })
  description: string;

  @IsUrl()
  @Field({ nullable: true })
  url: string;

  @IsNumber()
  @Field({ nullable: true })
  rating: number;

  @IsString()
  @Field({ nullable: true })
  location: string;

  @IsString()
  @Field({ nullable: true })
  category: string;

  @IsNumber()
  @Field({ nullable: true })
  price: number;
}
