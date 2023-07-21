import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('user')
export class User {
  @Field(() => ID)
  id: number;

  @Field()
  name: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
