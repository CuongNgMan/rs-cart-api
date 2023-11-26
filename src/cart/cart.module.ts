import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';
import { CartItems } from './cart-item.entity';
import { Carts } from './cart.entity';

@Module({
  imports: [OrderModule, TypeOrmModule.forFeature([CartItems, Carts])],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
