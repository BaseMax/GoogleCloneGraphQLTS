import { Field, ID, InputType } from '@nestjs/graphql';
import { IsNumber, IsString, IsDate } from 'class-validator';

@InputType()
export class SearchHistory {
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
