// PopularProductsSection.test.tsx

import { render, screen } from '@testing-library/react';
import PopularProductsSection from '../components/hero/PopularProductsSection';
import { useProductSearch } from '../hooks/useFetchProducts';

jest.mock('../hooks/useFetchProducts', () => ({
  __esModule: true,
  useProductSearch: jest.fn(),
}));

jest.mock('../components/hero/PopularProductCard', () => ({
  __esModule: true,
  default: ({ rank }: any) => <div data-testid="popular-product-card">rank:{rank}</div>,
}));

jest.mock('../components/hero/PopularProductsSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="popular-products-skeleton" />,
}));

const mockUseProductSearch = useProductSearch as unknown as jest.Mock;

describe('인기 상품 섹션 (PopularProductsSection)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('로딩 중이면 스켈레톤이 렌더링된다.', () => {
    mockUseProductSearch.mockReturnValue({
      data: undefined,
      isLoading: true,
    });

    render(<PopularProductsSection />);

    expect(screen.getByTestId('popular-products-skeleton')).toBeInTheDocument();
  });

  test('데이터가 없으면 아무것도 렌더링되지 않는다.', () => {
    mockUseProductSearch.mockReturnValue({
      data: undefined,
      isLoading: false,
    });

    const { container } = render(<PopularProductsSection />);

    expect(container.firstChild).toBeNull();
  });

  test('데이터가 있으면 제목과 상품 리스트가 렌더링된다.', () => {
    mockUseProductSearch.mockReturnValue({
      isLoading: false,
      data: [{ productId: 1 }, { productId: 2 }],
    });

    render(<PopularProductsSection />);

    expect(screen.getByText('실시간 인기 제품')).toBeInTheDocument();
    expect(screen.getAllByTestId('popular-product-card')).toHaveLength(2);
    expect(screen.getByText('rank:1')).toBeInTheDocument();
    expect(screen.getByText('rank:2')).toBeInTheDocument();
  });
});
