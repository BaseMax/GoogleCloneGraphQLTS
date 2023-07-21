import { Field,InputType } from "@nestjs/graphql";
import { IsString, IsUrl, IsNumber } from 'class-validator';

@InputType()
export class PaginationInput {
  @IsNumber()
  @Field()
  name: number;
}