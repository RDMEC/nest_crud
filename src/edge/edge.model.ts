import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Edge {
  @Field(() => Int)
  id: number;

  @Field()
  created_at: Date;

  @Field()
  updated_at: Date;

  @Field(() => Int)
  capacity: number;

  @Field()
  node1_alias: string;

  @Field()
  node2_alias: string;
}
