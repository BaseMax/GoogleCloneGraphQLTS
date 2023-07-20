import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsString, IsDate } from 'class-validator';

@ObjectType('SearchHistoryModel')
export class SearchHistoryModel {
  @Field(() => ID)
  id: number;

  @IsString()
  @Field({ nullable: true })
  query: string;

  @IsDate()
  @Field({ nullable: true })
  createdAt: Date;

  @IsNumber()
  @Field(() => ID, { nullable: true })
  userId: number;
}
