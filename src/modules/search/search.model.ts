import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('search')
export class Search {
  @Field(() => ID)
  id: number;

  @Field()
  title: string;

  @Field()
  description: string;
}
