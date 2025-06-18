import { Typography, Container, Box, Button, Card, CardContent, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import { useCart } from '../contexts/CartContext'
import { Link } from 'react-router-dom'

const CartPage = () => {
  const { state, dispatch } = useCart()

  const handleRemove = (productId: number) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { productId } })
  }
  const handleQuantityChange = (productId: number, quantity: number) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { productId, quantity },
    })
  }

  const total = state.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return state.items.length === 0 ? (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h6" align="center">
        現在カートには何も入っていません。
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          component={Link}
          to="/"
          variant="contained"
          sx={{
            mt: 4,
            borderRadius: '999px',
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            '&:hover': {
              color: 'white', // ← 文字色も固定
            },
          }}
        >
          商品一覧に戻る
        </Button>
      </Box>
    </Container>
  ) : (
    <Container sx={{ mt: 4, mb: 6 , p: 0,}}>
      <Typography variant="h5">カート</Typography>

      {/* 🛒 商品リストをここに表示 */}
      <Card sx={{  mt: 4 }}>
        <CardContent>
          {state.items.map((item, index) => (
            <Box
              key={item.productId}
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column',sm: 'column', md: 'row' },
                alignItems: 'center',
                justifyContent: 'space-between',
                // 最後のアイテム以外にだけ下線を表示する
                borderBottom: index !== state.items.length - 1 ? '1px solid #ccc' : 'none',
                mt: 2,
                pb: 2,
              }}
            >
              <Box 
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  width: { xs: '100%',sm: '100%', md: '68%' },
                  color: 'black',
                  transition: 'opacity 0.3s ease',
                  '&:hover': {
                    opacity: 0.7,
                    color: 'black',
                  },
                }}
                component={Link}
                to={`/products/${item.productId}`} // 商品詳細ページに遷移
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: 64, height: 64, objectFit: 'contain' }}
                />
                <Typography>{item.title}</Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: { xs: 3, sm: 3, md: 0 },
                  flexWrap: 'wrap',
                  width: { xs: '100%',sm: '100%', md: '30%' },
                }}
              >
                {/* 数量変更 */}
                <FormControl
                  size="small"
                  sx={{
                    minWidth: 80,
                    width: { xs: '100%', md: 'auto' },
                    mb: { xs: 2 ,sm: 2, md: 0 },
                  }}
                >
                  <InputLabel id={`quantity-label-${item.productId}`}>数量</InputLabel>
                  <Select
                    labelId={`quantity-label-${item.productId}`}
                    value={item.quantity}
                    label="数量"
                    onChange={(e) =>
                      handleQuantityChange(item.productId, Number(e.target.value))
                    }
                  >
                    {/* quantity（数量） */}
                    {[1, 2, 3, 4, 5].map((quantity) => (
                      <MenuItem key={quantity} value={quantity}>
                        {quantity}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Typography>
                  ${(item.price * item.quantity).toLocaleString()}
                </Typography>

                {/* ✅ 削除ボタンを金額の右側に配置 & 実際に削除 */}
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  onClick={() => handleRemove(item.productId)}
                  sx={{ whiteSpace: 'nowrap' }} // ← 改行防止
                >
                  削除
                </Button>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>

      <Box
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'flex-end' }, // SP:中央 / PC:左
          textAlign: { xs: 'center', md: 'left' },
          gap: 6,
        }}
      >
        {/* ← 左：商品一覧に戻る */}
        <Button
          component={Link}
          to="/"
          variant="outlined"
          sx={{
            borderRadius: '999px',
            fontWeight: 'bold',
            '&:hover': {
              color: '#6f5675',
            },      
          }}
        >
          商品一覧に戻る
        </Button>

        {/* → 右：合計＋注文ボタン */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-end' },
            textAlign: { xs: 'center', md: 'right' },
          }}
        >
          <Typography sx={{ fontWeight: 'bold', mb: 2 }}>
            合計 ${total.toLocaleString()}
          </Typography>

          <Button
            variant="contained"
            sx={{
              borderRadius: '999px',
              px: 4,
              fontWeight: 'bold',
            }}
          >
            注文手続きへ
          </Button>
        </Box>
      </Box>
    </Container>
  )
}

export default CartPage