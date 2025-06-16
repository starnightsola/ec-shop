import { createContext, useReducer, useContext } from 'react'
import type { ReactNode } from 'react' // ✅ ReactNode を type-only でインポート
import type { CartState, CartAction } from '../types/cart' // ✅ 型のみインポート
import { cartReducer } from '../reducers/cartReducer'

// 初期状態
const initialState: CartState = {
  items: [],
}

// Context作成
const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
} | undefined>(undefined)
// undefined：初期値。ここではまだ何も入ってない状態（初期は未定義）にしておく。
// | undefined:まだ CartContext.Provider に包まれていないときに、undefined になる可能性がある

// Providerコンポーネント
// children は、この CartProvider の中に「包まれる」コンポーネントたち（中身）です。
// 型 { children: ReactNode } は、子要素として何でも受け取れることを意味します。
export const CartProvider = ({ children }: { children: ReactNode }) => {
    // useReducer は状態とその更新方法（dispatch）をセットで管理します。
    // cartReducer は、状態をどう更新するか定義した関数。
    // initialState はカートの初期状態（例：空の配列）。
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

// useContextで使いやすくするカスタムフック
export const useCart = () => {
    // CartContext の中身（{ state, dispatch }）を取得します。
  const context = useContext(CartContext)
  
  // CartProvider でラップされていない状態で使われた場合、Reactは undefined を返すため、それを検知して明確なエラーを出しています。
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}
