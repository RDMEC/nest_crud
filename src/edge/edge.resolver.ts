import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { CreateEdgeArgs, GetEdgeArgs } from './edge.args';

import { Edge } from './edge.model';
import { EdgeService } from './edge.service';

@Resolver(Edge)
export class EdgeResolver {
  constructor(private edgesService: EdgeService) {}

  @Query(() => Edge)
  async getEdge(@Args() args: GetEdgeArgs) {
    return this.edgesService.findOne(args.id);
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
