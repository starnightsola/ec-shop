import { useLocation } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { fetchProducts } from '../api/products'
import type { Product } from '../types/product'
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid,
  Box
} from '@mui/material'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { createAddToCartAction } from '../utils/cartHelpers'
import { useNavigate } from 'react-router-dom'


const SearchResultPage = () => {
    // 意味: 現在のURL情報（パスやクエリパラメータ）を取得するReact Routerのフック。
    // 目的: ?q=キーワード のような 検索クエリ を取得するため。
  const location = useLocation()

    // 意味: location.search（例: ?q=mens）をパースして、クエリを扱いやすくする。
    // 目的: q=... の値を簡単に取り出せるようにする。
  const queryParams = new URLSearchParams(location.search)

    // 意味: クエリパラメータ q の値を取得。なければ空文字を代入。
    //目的: 検索キーワードとして使うための文字列を用意。
  const searchQuery = queryParams.get('q') || ''

  const { dispatch } = useCart()
  const navigate = useNavigate()

  const { data, isLoading, error } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: fetchProducts,
  })

    // 意味: 商品データ（data）から、検索キーワードにマッチするものだけを抽出して記憶。
    // 目的: 毎回再計算しないようにパフォーマンス最適化。
  const filteredProducts = useMemo(() => {
    return data
        ?.filter((product) =>
            // .toLowerCase()大文字小文字の違いを無視
            // .includes(...)：文字列が含まれているかどうか
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        ?? []
        
        // 依存配列
  }, [data, searchQuery])

  if (isLoading) {
    return (
      <Container sx={{ textAlign: 'center', mt: 4 }}>
        <CircularProgress />
      </Container>
    )
  }
  if (error) return <Container><Typography>読み込みエラー</Typography></Container>

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h5" sx={{ mb: 2, textAlign: 'center' }}>
        「{searchQuery}」の検索結果
      </Typography>

      {filteredProducts?.length === 0 ? (
        <Container sx={{ mt: 4, mb: 6 }}>
            <Typography align="center">
                該当する商品が見つかりませんでした。
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    component={Link}
                    to="/"
                    variant="outlined"
                    sx={{
                        mt: 4,
                        borderRadius: '999px',
                        fontWeight: 'bold',
                        '&:hover': {
                        color: '#6f5675',
                        },      
                    }}
                    >
                    商品一覧に戻る
                </Button>
            </Box>
        </Container>
        
      ) : (
        <>
            <Grid container spacing={2}>
            {filteredProducts.map((product) => (
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
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button
                    component={Link}
                    to="/"
                    variant="outlined"
                    sx={{
                        mt: 6,
                        borderRadius: '999px',
                        fontWeight: 'bold',
                        '&:hover': {
                        color: '#6f5675',
                        },      
                    }}
                    >
                    商品一覧に戻る
                </Button>
            </Box>
        </>
        
        
      )}
    </Container>
  )
}

export default SearchResultPage
