import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api/products'
import type { Product } from '../types/product'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Container,
  Button,
  Box,
} from '@mui/material'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { createAddToCartAction } from '../utils/cartHelpers'
import { useNavigate } from 'react-router-dom'

const ProductListPage = () => {
  // data: APIから取得された商品データ配列
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'], // キャッシュ識別用のキー
    queryFn: fetchProducts, //データ取得関数（API呼び出し）
  })
  const { dispatch } = useCart()
  const navigate = useNavigate()
  if (isLoading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Alert severity="error">商品データの取得に失敗しました</Alert>
      </Container>
    )
  }
  return (
    <Container sx={{ my: 4, p: 0, }}>
      <Grid container spacing={2}>
        {data?.map((product) => (
          <Grid key={product.id} size={{ xs: 6, md: 4 }}>
            <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <Link to={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <CardMedia
                  component="img"
                  image={product.image}
                  alt={product.title}
                  sx={{ objectFit: 'contain', height: 200, p: 2 }}
                />
                <CardContent
                  sx={{
                    flexGrow: 1,
                    px: 1.25,
                    pt: 0,
                    pb: '0!important',
                  }}
                >
                  <Typography variant="h6" noWrap>
                    {product.title}
                  </Typography>
                </CardContent>
              </Link>
              <Box sx={{ px: 1.25, pb: 2 }}>
                <Typography color="text.secondary">
                  ${product.price.toFixed(2)}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    width: '100%',
                    mt: 2,
                    borderRadius: '999px',       // 極端な丸み（pill型）
                    fontWeight: 'bold',
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
                        1
                      )
                    )
                    navigate('/cart') // ✅ カートページに遷移
                  }}
                >
                  カートに追加
                </Button>
              </Box>
              
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ProductListPage