import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

import { EdgeEntity } from './edge.entity';

import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';

@Injectable()
export class EdgeService {
  constructor(
    @InjectRepository(EdgeEntity)
    private readonly edgesRepository: Repository<EdgeEntity>,
    private readonly amqpConnection: AmqpConnection,
  ) {}

  findAll(): Promise<EdgeEntity[]> {
    return this.edgesRepository.find();
  }

  async findOne(id: number): Promise<EdgeEntity> {
    return this.edgesRepository.findOne(id);
  }

  async createEdge(
    capacity: number,
    node1_alias: string,
    node2_alias: string,
  ): Promise<EdgeEntity> {
    const response = await this.edgesRepository.insert({
      capacity: capacity,
      node1_alias: node1_alias,
      node2_alias: node2_alias,
    });
    console.log('edge.resolver createEdge response', response);

    const edge = {
      id: response.raw[0].id,
      created_at: response.raw[0].created_at,
      updated_at: response.raw[0].updated_at,
      capacity: capacity,
      node1_alias: node1_alias,
      node2_alias: node2_alias,
    };

    this.amqpConnection.publish('edge-events', 'create-edge', edge);

    return this.edgesRepository.create(edge);
  }

  @RabbitSubscribe({
    exchange: 'edge-events',
    routingKey: 'create-edge',
    queue: 'create-edge-queue',
  })
  public async pubSubHandler(msg: EdgeEntity) {
    console.log(
      `New channel between ${msg['node1_alias']} and ${msg['node2_alias']} with a capacity of ${msg['capacity']} has been created.`,
    );

    this.edgesRepository.update(
      {
        id: msg['id'],
      },
      {
        node1_alias: msg['node1_alias'] + '-updated',
        node2_alias: msg['node2_alias'] + '-updated',
      },
    );
  }
}
