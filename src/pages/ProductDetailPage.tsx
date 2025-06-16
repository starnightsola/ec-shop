import { useParams } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchProductById } from '../api/products'
import { Box, CircularProgress, Container, Typography, Alert, Button, TextField } from '@mui/material'

const ProductDetailPage = () => {
  const { productId } = useParams()
  
  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId], //商品IDごとに個別キャッシュ
    queryFn: () => fetchProductById(productId!),
    enabled: !!productId,
  })
  const [quantity, setQuantity] = useState(1)

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
            maxWidth: 600,
            mx: 'auto', // 中央寄せ
            mb: 4, // 下余白
          }}
        >
          <TextField
            type="number"
            label="数量"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            inputProps={{ min: 1 }}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              borderRadius: '999px',       // 極端な丸み（pill型）
              fontWeight: 'bold',
            }}
            onClick={() => {
              // ここで dispatch などに quantity を渡す処理を追加予定
              console.log('カートに追加: 数量', quantity)
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