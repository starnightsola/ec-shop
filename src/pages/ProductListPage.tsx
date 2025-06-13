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
} from '@mui/material'

const ProductListPage = () => {
  // data: APIから取得された商品データ配列
  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'], // キャッシュ識別用のキー
    queryFn: fetchProducts, //データ取得関数（API呼び出し）
  })
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
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {data?.map((product) => (
          <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{ objectFit: 'contain', height: 200, p: 2 }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" noWrap>
                  {product.title}
                </Typography>
                <Typography color="text.secondary">
                  ${product.price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

export default ProductListPage