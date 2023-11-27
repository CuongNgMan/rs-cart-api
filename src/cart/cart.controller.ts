import {
  Controller,
  Get,
  Delete,
  Put,
  Body,
  Req,
  Post,
  HttpStatus,
  Param,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { OrderService } from '../order';
import { AppRequest, getUserIdFromRequest } from '../shared';

import { CartService } from './services';

@Controller('api/profile/cart')
export class CartController {
  constructor(
    private cartService: CartService,
    private orderService: OrderService,
  ) {}

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Get(':userId')
  findUserCart(@Param('userId') userId: string, @Res() response: Response) {
    const cart = this.cartService.findByUserId(userId);

    if (!cart) {
      return response.status(HttpStatus.NOT_FOUND).json({
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Cart not found',
      });
    }

    return response.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: { cart, total: '100' },
    });
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Put()
  updateUserCart(@Req() req: AppRequest, @Body() body) {
    // TODO: validate body payload...
    const cart = this.cartService.updateByUserId(
      getUserIdFromRequest(req),
      body,
    );

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
      data: {
        cart,
        total: 10,
      },
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Delete()
  clearUserCart(@Req() req: AppRequest) {
    this.cartService.removeByUserId(getUserIdFromRequest(req));

    return {
      statusCode: HttpStatus.OK,
      message: 'OK',
    };
  }

  // @UseGuards(JwtAuthGuard)
  // @UseGuards(BasicAuthGuard)
  @Post('checkout/:userId')
  async checkout(@Param('userId') userId: string, @Body() body) {
    const cart = await this.cartService.findByUserId(userId);

    if (!(cart && cart.items.length)) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Cart is empty',
      };
    }

    const total = cart.items.reduce((acc, item) => acc + item.count, 0);

    const order = await this.orderService.createOrder({
      cart,
      userId,
      payment: JSON.stringify({ method: 'credit_card' }),
      delivery: JSON.stringify({ method: 'pick_up' }),
      comments: body.comments || '',
      status: 'OPEN',
      total,
    });

    await this.cartService.updateCartStatus(cart.id, 'ORDERED');

    return {
      statusCode: HttpStatus.OK,
      message: 'Checkout successful',
      data: { order },
    };
  }
}
