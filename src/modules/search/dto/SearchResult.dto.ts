import { InputType, ID, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

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

  @IsNumber()
  @Field()
  @IsOptional()
  count: number;

  @IsUrl()
  @Field()
  url: string;

  @IsNumber()
  @Field()
  @IsOptional()
  rating: number;

  @IsString()
  @Field()
  @IsOptional()
  location: string;

  @IsString()
  @Field()
  @IsOptional()
  category: string;

  @IsNumber()
  @Field()
  @IsOptional()
  price: number;
}
