import type { Product } from '../types/product'

// Promise<Product[]> 「商品（Product）の配列が非同期で返ってくる」
export const fetchProducts = async (): Promise<Product[]> => {
    const res = await fetch('https://fakestoreapi.com/products')
    if (!res.ok) throw new Error('商品データの取得に失敗しました')
    return res.json()
}

// | 処理内容            | 解説 |
// |---------------------|------|
// | APIへのリクエスト    | `fetch()` を使って `/products` にアクセス |
// | エラーハンドリング  | `!res.ok` で異常系を捕捉し、throw |
// | データ返却          | JSON形式に変換して返す（React Query が受け取る） |

export const fetchProductById = async (id: string) => {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`)
  if (!res.ok) throw new Error('商品詳細の取得に失敗しました')
  return res.json()
}