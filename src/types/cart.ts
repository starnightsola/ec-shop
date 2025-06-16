// カート内の1つの商品を表す型
export interface CartItem {
  productId: number
  title: string
  price: number
  image: string
  quantity: number
}

// カート全体の状態
export interface CartState {
  items: CartItem[]
  // 複数の CartItem を配列で管理します。
}

// 状態更新のためのアクション
export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: { productId: number } }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: number; quantity: number } }