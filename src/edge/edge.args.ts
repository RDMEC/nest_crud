import { Field, ArgsType } from '@nestjs/graphql';
import { Min, Max } from 'class-validator';

@ArgsType()
export class CreateEdgeArgs {
  @Field()
  @Min(10000)
  @Max(1000000)
  capacity: number;

  @Field()
  node1_alias: string;

  @Field()
  node2_alias: string;
}
