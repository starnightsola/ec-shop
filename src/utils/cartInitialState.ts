// カートの初期状態（最初にアプリを開いたときの状態）を定義
import type { CartState } from '../types/cart'

export const loadCartFromStorage = (): CartState => {
  try {
    const data = localStorage.getItem('cart')
    if (data) {
        // 保存された文字列データを JavaScript のオブジェクト（配列）に戻す
      return JSON.parse(data)
    }
  } catch (e) {
    console.error('カート状態の読み込みに失敗しました', e)
  }
  // 失敗したときや保存データがないときは空のカートにする
  return { items: [] } // デフォルト値
}