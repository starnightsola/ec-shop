import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProductById } from '../api/products'
import { Box, CircularProgress, Container, Typography, Alert } from '@mui/material'

const ProductDetailPage = () => {
  const { productId } = useParams()

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId], //商品IDごとに個別キャッシュ
    queryFn: () => fetchProductById(productId!),
    enabled: !!productId,
  })

  if (isLoading) return <Container><CircularProgress /></Container>
  if (error || !product) return <Container><Alert severity="error">データ取得エラー</Alert></Container>

  return (
    <Container sx={{ mt: 4 }}>
      {/* 商品名・画像・金額をまとめて中央揃え */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // ← 中央寄せ
          textAlign: 'center',  // ← テキストも中央に
          gap: 2,                // ← 間の余白
          mb: 4,
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
      </Box>

      {/* 説明文は左寄せのまま */}
      <Typography variant="body2" color="text.secondary">
        {product.description}
      </Typography>
    </Container>
  )
}

export default ProductDetailPage