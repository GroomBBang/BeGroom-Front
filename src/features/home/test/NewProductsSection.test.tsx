// src/features/home/test/NewProductsSection.test.tsx
import { render, screen } from '@testing-library/react';
import NewProductsSection from '../components/hero/NewProductsSection';
import { useProductSearch } from '../hooks/useFetchProducts';

jest.mock('../hooks/useFetchProducts', () => ({
  __esModule: true,
  useProductSearch: jest.fn(),
}));

jest.mock('../components/hero/NewProductsSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="new-products-skeleton" />,
}));

jest.mock('../../product/components/ProductCard', () => ({
  __esModule: true,
  default: ({ product }: any) => <div data-testid="product-card">{product.productId}</div>,
}));

const mockUseProductSearch = useProductSearch as unknown as jest.Mock;

describe('신상품 섹션 (NewProductsSection)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('로딩 중이면 스켈레톤이 렌더링된다.', () => {
    mockUseProductSearch.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<NewProductsSection />);

    expect(screen.getByTestId('new-products-skeleton')).toBeInTheDocument();
    expect(screen.queryByText('오늘 나온 새로운 제품')).not.toBeInTheDocument();
  });

  test('데이터가 없으면 아무것도 렌더링되지 않는다.', () => {
    mockUseProductSearch.mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    const { container } = render(<NewProductsSection />);

    expect(container.firstChild).toBeNull();
  });

  test('데이터가 있으면 상품 목록이 렌더링된다.', () => {
    mockUseProductSearch.mockReturnValue({
      isLoading: false,
      data: [{ productId: 1 }, { productId: 2 }],
    });

    render(<NewProductsSection />);

    expect(screen.getByText('오늘 나온 새로운 제품')).toBeInTheDocument();
    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
  });
});
