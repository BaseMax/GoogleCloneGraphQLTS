import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsUrl } from 'class-validator';

@InputType()
export class SearchFilters {
  @IsNumber()
  @Field()
  name: number;
}
