import { Carts } from '../cart.entity';
import { CartItems } from '../cart-item.entity';

/**
 * @param {Cart} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Carts): number {
  return cart
    ? cart.items.reduce(
        (acc: number, { product: { price }, count }: CartItems) => {
          return (acc += price * count);
        },
        0,
      )
    : 0;
}
