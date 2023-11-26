import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrderService } from './services';
import { Orders } from './order.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders])],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
