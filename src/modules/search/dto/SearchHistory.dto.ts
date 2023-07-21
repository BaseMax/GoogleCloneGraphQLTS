import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsDate } from 'class-validator';

@InputType()
export class SearchHistory {
  @IsString()
  @Field()
  query: string;

  @IsDate()
  @Field()
  createdAt: Date;

  @Field(() => ID)
  userId: number;
}
