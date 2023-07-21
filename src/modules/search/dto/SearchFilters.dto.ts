import { Field, Int, InputType } from '@nestjs/graphql';
import {
  IsNumber,
  IsString,
  IsUrl,
  IsDate,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
// DTO for date range

@InputType()
class DateRange {
  @Field(() => Date, { nullable: true }) // Use @Field() with appropriate types for GraphQL
  @IsDate()
  @IsOptional()
  from?: Date;

  @Field(() => Date, { nullable: true }) // Use @Field() with appropriate types for GraphQL
  @IsDate()
  @IsOptional()
  to?: Date;
}

// DTO for price range
@InputType()
class PriceRange {
  @Field(() => Date, { nullable: true }) // Use @Field() with appropriate types for GraphQL
  @IsDate()
  @IsOptional()
  from?: number;

  @Field(() => Date, { nullable: true }) // Use @Field() with appropriate types for GraphQL
  @IsDate()
  @IsOptional()
  to?: number;
}

@InputType()
export class SearchFilters {
  @Field({ nullable: true })
  @IsString()
  category?: string;

  @Field(() => DateRange, { nullable: true })
  @ValidateNested()
  dateRange?: DateRange;

  @Field({ nullable: true })
  location?: string;

  @Field(() => PriceRange, { nullable: true })
  @ValidateNested()
  priceRange?: PriceRange;

  @Field(() => Int, { nullable: true })
  @IsNumber()
  rating?: number;
}
