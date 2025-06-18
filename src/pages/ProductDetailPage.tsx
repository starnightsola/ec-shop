import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProductById } from '../api/products'
import { Box, CircularProgress, Container, Typography, Alert, Button, FormControl, InputLabel, Select, MenuItem, } from '@mui/material'
import { useCart } from '../contexts/CartContext'
import { createAddToCartAction } from '../utils/cartHelpers'
import { useNavigate } from 'react-router-dom'

const ProductDetailPage = () => {
  const { productId } = useParams()
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId], //商品IDごとに個別キャッシュ
    queryFn: () => fetchProductById(productId!),
    enabled: !!productId,
  })

  // setQuantity: quantity を更新する関数
  // useState(1): React に「このコンポーネント内で quantity という状態を使いたい、初期値は 1」と伝える。
  const [quantity, setQuantity] = useState(1)

  const { dispatch } = useCart()
  const navigate = useNavigate()
  if (isLoading) return <Container><CircularProgress /></Container>
  if (error || !product) return <Container><Alert severity="error">データ取得エラー</Alert></Container>

  return (
    <Container sx={{ my: 4 }}>
      {/* 商品名・画像・金額をまとめて中央揃え */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // ← 中央寄せ
          textAlign: 'center',  // ← テキストも中央に
          gap: 2,                // ← 間の余白
        }}
      >
        <Typography variant="h5">{product.title}</Typography>

        <img
          src={product.image}
          alt={product.title}
          style={{
            maxWidth: '100%',
            maxHeight: 300,
            objectFit: 'contain',
          }}
        />

        <Typography variant="h6" color="text.secondary">
          ${product.price.toFixed(2)}
        </Typography>
        {/* ✅ 追加：ボタン */}
        <Box 
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 2,
            mx: 'auto', // 中央寄せ
            mb: 4, // 下余白
          }}
        >
          <FormControl fullWidth>
            <InputLabel id="quantity-label">数量</InputLabel>
            <Select
              labelId="quantity-label"

              // 今選ばれている数量（状態）
              value={quantity}
              label="数量"
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((quantity) => (
                <MenuItem key={quantity} value={quantity}>
                  {quantity}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              borderRadius: '999px',       // 極端な丸み（pill型）
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              px: 4,
            }}
            onClick={() => {
              dispatch(
                createAddToCartAction(
                  {
                    productId: product.id,
                    title: product.title,
                    price: product.price,
                    image: product.image,
                  },
                  quantity // ✅ ユーザーが選んだ数量
                )
              )
              navigate('/cart') // ✅ カートページへ遷移
            }}
          >
            カートに追加
          </Button>
        </Box>
      </Box>

      {/* 説明文は左寄せのまま */}
      <Typography variant="body2" color="text.secondary">
        {product.description}
      </Typography>
    </Container>
  )
}

export default ProductDetailPage