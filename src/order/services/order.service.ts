import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { Repository } from 'typeorm';
import { Orders } from '../order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders) private orderRepository: Repository<Orders>,
  ) {}

  async createOrder(orderData: Partial<Orders>): Promise<Orders> {
    const order = this.orderRepository.create(orderData);
    return this.orderRepository.save(order);
  }
}
