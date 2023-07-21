import { Field, InputType } from '@nestjs/graphql';
import { IsNumber } from 'class-validator';

@InputType()
export class PaginationInput {
  @IsNumber()
  @Field()
  perPage: number;

  @IsNumber()
  @Field()
  page: number;
}
