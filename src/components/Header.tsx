// src/components/Header.tsx
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material/styles'

const Header = () => {
  const theme = useTheme()
  return (
    <AppBar position="static" sx={{ bgcolor: theme.palette.custom.coral, color: 'white' }}>
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ color: 'white', textDecoration: 'none', flexGrow: 1,'&:hover': {
            color: theme.palette.custom.olive,
          }, }}
        >
          ECショップ
        </Typography>
        <IconButton component={Link} to="/cart" color="inherit" sx={{ '&:hover': {
            color: theme.palette.custom.olive,
          }, }}>
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Header