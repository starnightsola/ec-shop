// src/components/Header.tsx
import { AppBar, Toolbar, Typography, IconButton, Box, Badge, TextField } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'
import { useMemo } from 'react'
import { useCart } from '../contexts/CartContext'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import { useNavigate } from 'react-router-dom'



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

  // 検索窓を表示するかどうかの状態（`true` なら表示）
  const [showSearch, setShowSearch] = useState(false)

  // ユーザーが入力した検索キーワードを保存
  const [searchQuery, setSearchQuery] = useState('')

  // React Router の関数で、プログラムからページ遷移するために使用（検索結果ページに飛ぶ）
  const navigate = useNavigate()

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
          {/* 左側：ロゴ */}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{ 
              color: 'white',
              textDecoration: 'none',
              '&:hover': {
                color: 'white', // ← 文字色も固定
              },
            }}
          >
            ECshop
          </Typography>
          {/* 右側：検索 → カート */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {/* 🔍 検索アイコン */}
            <IconButton
              color="inherit"
              onClick={() => setShowSearch(true)} // ← 別途 state 定義必要
              sx={{
                '&:hover': {
                  color: 'inherit',
                },
              }}
            >
              <SearchIcon />
            </IconButton>

            {/* 🛒 カートアイコン */}
            <IconButton
              color="inherit"
              component={Link}
              to="/cart"
              sx={{
                '&:hover': {
                  color: 'inherit',
                },
              }}
            >
              <Badge badgeContent={totalQuantity} color="secondary">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>
        {showSearch && (
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100vh',
              bgcolor: 'rgba(0, 0, 0, 0.95)',
              zIndex: 1300,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              pt: 10,
              px: 2,
            }}
          >
            {/* 閉じるボタン */}
            <IconButton
              onClick={() => setShowSearch(false)}
              sx={{ position: 'absolute', top: 16, right: 16, color: 'white' }}
            >
              <CloseIcon />
            </IconButton>

            {/* 検索バー */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                maxWidth: 600,
                bgcolor: 'white',
                borderRadius: 2,
                px: 2,
                py: 1,
              }}
            >
              <TextField
                placeholder="検索キーワードを入力"
                variant="standard"
                value={searchQuery}
                // e.target.value：入力欄に現在入力されている文字列
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setShowSearch(false)
                    navigate(`/search?q=${searchQuery}`) // 例：クエリ付きの検索ページに遷移
                    setSearchQuery('') // ← 入力欄をクリア
                  }
                }}
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
              />
              <SearchIcon />
            </Box>
          </Box>
        )}

      </Toolbar>
    </AppBar>
  )
}

export default Header