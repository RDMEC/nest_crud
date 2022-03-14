import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';

import { EdgeResolver } from './edge.resolver';
import { EdgeService } from './edge.service';
import { EdgeEntity } from './edge.entity';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'ln-landscape',
      entities: [EdgeEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([EdgeEntity]),
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: 'edge-events',
          type: 'topic',
        },
      ],
      uri: 'amqp://rabbitmq:rabbitmq@localhost:5672',
    }),
  ],
  providers: [EdgeResolver, EdgeService],
})
export class EdgeModule {}
