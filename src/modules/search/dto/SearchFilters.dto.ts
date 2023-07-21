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
class DateRange {
  @IsDate()
  @IsOptional()
  from?: Date;

  @IsDate()
  @IsOptional()
  to?: Date;
}

// DTO for price range
class PriceRange {
  @IsDate()
  @IsOptional()
  from?: number;

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
  @Type(() => DateRange)
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
