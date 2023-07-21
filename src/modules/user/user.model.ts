import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('user')
export class User {
  @Field(() => ID, { nullable: true })
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  phonenumber: string;

  @Field({ nullable: true })
  email: string;
}
