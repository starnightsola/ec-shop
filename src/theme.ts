import { createTheme } from '@mui/material/styles'

// 型拡張：CustomPalette という任意プロパティを追加
declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      headerFooter: string
      background: string
    }
  }
  interface PaletteOptions {
    custom?: {
      headerFooter: string
      background: string
    }
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#856C8B',
    },
    background: {
      default: '#F8F3EB',
    },
    text: {
      primary: '#333',
    },
    custom: {
      headerFooter: '#856C8B',
      background: '#F8F3EB',
    },
  },
})

export default theme