import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Container, Box } from '@mui/material'
import ProductListPage from './pages/ProductListPage'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'

function App() {

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />

      <Container sx={{ py: 4, flex: 1 }}>
        <Routes>
          <Route path="/" element={<ProductListPage />} />
          <Route path="/products/:productId" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Container>

      <Footer />
    </Box>
  )
}

export default App
