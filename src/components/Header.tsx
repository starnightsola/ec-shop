// src/components/Header.tsx
import { AppBar, Toolbar, Typography, IconButton, Box, Badge } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { useCart } from '../contexts/CartContext'


const Header = () => {
  const theme = useTheme()
  const { state } = useCart()

  // useMemo(...):再計算の無駄を防ぐReactの機能。
  const totalQuantity = useMemo(() => {
    // state.items（カート内の商品リスト）をループして
    // 各商品の数量（item.quantity）を合計する
    return state.items.reduce(
      (sum, item) => sum + item.quantity,
       0 // 最初の合計は0からスタート
    )
  }, [state.items]) // ← itemsが変わった時だけ再計算

  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.custom.headerFooter, color: 'white' }}>
      <Toolbar>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ color: 'white', textDecoration: 'none', }}
          >
            ECショップ
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={totalQuantity} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header