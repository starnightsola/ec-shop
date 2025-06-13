import { Box, Typography } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const Footer = () => {
  const theme = useTheme()
  return (
    <Box component="footer" sx={{ bgcolor: theme.palette.custom.headerFooter, py: 2, textAlign: 'center' }}>
      <Typography variant="body2" sx={{ color: 'white'}}>© 2025 My EC Shop</Typography>
    </Box>
  )
}

export default Footer