import { createTheme } from '@mui/material/styles'

// 型拡張：CustomPalette という任意プロパティを追加
declare module '@mui/material/styles' {
  interface Palette {
    custom: {
      coral: string
      beige: string
      mint: string
      olive: string
    }
  }
  interface PaletteOptions {
    custom?: {
      coral: string
      beige: string
      mint: string
      olive: string
    }
  }

}

const theme = createTheme({
  palette: {
    primary: {
      main: '#FA7070',
    },
    secondary: {
      main: '#A1C298',
    },
    background: {
      default: '#FBF2CF', // beige
      paper: '#C6EBC5',   // mint
    },
    text: {
      primary: '#333',
    },
    custom: {
      coral: '#FA7070',
      beige: '#FBF2CF',
      mint: '#C6EBC5',
      olive: '#A1C298',
    },
  },
})

export default theme