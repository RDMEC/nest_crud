import { Module } from '@nestjs/common';

import { EdgeModule } from './edge/edge.module';

@Module({
  imports: [EdgeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
