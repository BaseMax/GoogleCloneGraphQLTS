import { InputType, Field } from '@nestjs/graphql';
import {  IsString, IsUrl, IsNumber } from 'class-validator';

@InputType()
export class UpdateSearchResult {
  @IsNumber()
  @Field()
  id: number;
}
