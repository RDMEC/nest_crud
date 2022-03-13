import { Query, Mutation, Resolver, Args, Int } from '@nestjs/graphql';
import { CreateEdgeArgs } from './edge.args';

import { Edge } from './edge.model';
import { EdgeService } from './edge.service';

@Resolver(Edge)
export class EdgeResolver {
  constructor(private edgesService: EdgeService) {}

  @Query(() => Edge)
  async getEdge(@Args('id', { type: () => Int }) id: number) {
    return this.edgesService.findOne(id);
  }

  @Query(() => [Edge])
  async getEdges() {
    return this.edgesService.findAll();
  }

  @Mutation(() => Edge)
  async createEdge(@Args() args: CreateEdgeArgs) {
    return this.edgesService.createEdge(
      args.capacity,
      args.node1_alias,
      args.node2_alias,
    );
  }
}
