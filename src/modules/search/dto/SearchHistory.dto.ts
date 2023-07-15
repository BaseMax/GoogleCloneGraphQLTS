import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsUrl } from 'class-validator';

@InputType()
export class SearchHistory {
  @IsNumber()
  @Field()
  name: number;
}
