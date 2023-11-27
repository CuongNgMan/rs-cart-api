import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { v4 } from 'uuid';

import { Carts } from '../cart.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Carts) private cartRepository: Repository<Carts>,
  ) {}

  async findByUserId(userId: string): Promise<Carts> {
    return this.cartRepository.findOne({
      where: { userId },
      relations: ['items'],
    });
  }

  async createByUserId(userId: string): Promise<Carts> {
    const id = v4(v4());
    const userCart = {
      id,
      items: [],
    };
    const cart = this.cartRepository.create(userCart);
    return this.cartRepository.save(cart);
  }

  async findOrCreateByUserId(userId: string): Promise<Carts> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Carts): Promise<Carts> {
    const { id, ...rest } = await this.findOrCreateByUserId(userId);

    const updatedCart = {
      id,
      ...rest,
      items: [...items],
    };

    return this.cartRepository.save(updatedCart);
  }

  async updateCartStatus(cartId: string, status: string) {
    return this.cartRepository.update(cartId, { status });
  }

  async removeByUserId(userId) {
    return this.cartRepository.delete({ userId });
  }
}
