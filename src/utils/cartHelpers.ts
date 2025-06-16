import type { CartItem } from '../types/cart'
import type { CartAction } from '../types/cart'

export const createAddToCartAction = (
    // 商品情報。CartItem のうち quantity だけはここでは後から渡すので除いておく（Omit<...>）
  product: Omit<CartItem, 'quantity'>,
  quantity: number = 1
): CartAction => ({
  type: 'ADD_ITEM',
  payload: {
    ...product,
    quantity,
  },
})