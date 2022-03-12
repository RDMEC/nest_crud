import { Query, Mutation, Resolver, Int, Args } from '@nestjs/graphql';

import { Edge } from './edge.model';
import { EdgeService } from './edge.service';

@Resolver(Edge)
export class EdgeResolver {
  constructor(private edgesService: EdgeService) {}

  @Query(() => Edge)
  async getEdge(@Args('id', { type: () => Int }) id: number) {
    return this.edgesService.findOne(id);
  }

  @Query(() => Edge)
  async getEdges() {
    return this.edgesService.findAll();
  }

  @Mutation(() => Edge)
  async createEdge(
    @Args('capacity') capacity: number,
    @Args('node1_alias') node1_alias: string,
    @Args('node2_alias') node2_alias: string,
  ) {
    return this.edgesService.createEdge(capacity, node1_alias, node2_alias);
  }
}
