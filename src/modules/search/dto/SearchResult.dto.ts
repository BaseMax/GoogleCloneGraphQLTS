import { InputType, Field } from '@nestjs/graphql';
import { IsString, IsUrl } from 'class-validator';

@InputType()
export class SearchResult {
  @IsString()
  @Field()
  title: string;

}
