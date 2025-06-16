import type {  CartAction, CartState } from '../types/cart'

export const cartReducer = (
    state: CartState, // 現在のカートの状態（例：中にどんな商品が入っているか）
    action: CartAction // 実行したい操作（追加、削除、数量変更 など）
): CartState => {
    switch (action.type) {
        case 'ADD_ITEM': {
            // すでに商品があるかチェック
            // state.items：現在のカートに入っている商品リスト（配列）
            const existingItem = state.items.find(
                // アクションで追加しようとしている商品 (action.payload) と、すでにカートにある商品 (item) の productId が一致するかどうか。
                (item) => item.productId === action.payload.productId
            )
            if (existingItem) {
                // すでに存在する商品 → 数量だけ更新
                return {
                    // 現在のstate（カートの状態）を元に、新しいstateを作成して返す。
                    ...state,
                    items: state.items.map((item) =>
                        item.productId === action.payload.productId
                        ? { ...item, quantity: item.quantity + action.payload.quantity }

                        // 違う商品ならそのまま
                        : item
                    ),
                }
            }
            // 新規商品 → itemsに追加
            return {
                ...state,
                items: [...state.items, action.payload],
            }
        }
        case 'REMOVE_ITEM': {
            return {
                ...state,
                items: state.items.filter(
                    // 削除したい商品と一致しないもの（≠）だけ残す
                    (item) => item.productId !== action.payload.productId
                ),
            }
        }
        case 'UPDATE_QUANTITY': {
            return {
                ...state,
                items: state.items.map((item) =>
                item.productId === action.payload.productId
                    ? { ...item, quantity: action.payload.quantity }
                    : item
                ),
            }
        }
        default:
            return state
    }
}