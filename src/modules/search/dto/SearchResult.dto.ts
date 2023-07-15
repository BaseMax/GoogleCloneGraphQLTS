import { InputType, ID, Field } from '@nestjs/graphql';
import { IsNumber, IsString, IsUrl } from 'class-validator';

@InputType()
export class SearchResult {
  @Field(() => ID)
  id: number;

  @IsString()
  @Field()
  title: string;

  @IsString()
  @Field()
  description: string;

  @IsUrl()
  @Field()
  url: string;
}
