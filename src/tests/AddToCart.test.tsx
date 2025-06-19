import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { CartProvider } from '../contexts/CartContext'
import ProductDetailPage from '../pages/ProductDetailPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '@testing-library/jest-dom'

// ✅ APIをモック
jest.mock('@tanstack/react-query', () => {
  const actual = jest.requireActual('@tanstack/react-query')
  return {
    ...actual,
    useQuery: () => ({
      data: {
        id: 1,
        title: 'テスト商品',
        price: 1000,
        image: 'test.jpg',
      },
      isLoading: false,
      error: null,
    }),
    QueryClient: actual.QueryClient,
    QueryClientProvider: actual.QueryClientProvider,
  }
})

test('カートに商品を追加してページ遷移', async () => {
    const queryClient = new QueryClient()

  render(
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <MemoryRouter initialEntries={['/products/1']}>
          <ProductDetailPage />
        </MemoryRouter>
      </CartProvider>
    </QueryClientProvider>
  )

  // 適切なテスト内容を追加してください
  expect(await screen.findByText(/カートに追加/)).toBeInTheDocument()
})
