// CategorySection.test.tsx

import { render, screen } from '@testing-library/react';
import CategorySection from '../components/catalog/CategorySection';
import { useProductSearch } from '../hooks/useFetchProducts';

jest.mock('../hooks/useFetchProducts', () => ({
  __esModule: true,
  useProductSearch: jest.fn(),
}));

jest.mock('../components/catalog/CategorySectionSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="category-skeleton" />,
}));

jest.mock('../components/catalog/CategoryFeaturedSection', () => ({
  __esModule: true,
  default: ({ products }: any) => <div data-testid="featured">featured:{products.length}</div>,
}));

jest.mock('../components/catalog/CategoryProductList', () => ({
  __esModule: true,
  default: ({ products }: any) => <div data-testid="rest">rest:{products.length}</div>,
}));

const mockUseProductSearch = useProductSearch as unknown as jest.Mock;

describe('카테고리 섹션 (CategorySection)', () => {
  const category = {
    id: '10',
    label: '채소',
    subcategories: [
      { id: '11', label: '상추' },
      { id: '12', label: '오이' },
    ],
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('로딩 중이면 스켈레톤이 렌더링된다.', () => {
    mockUseProductSearch.mockReturnValue({ data: undefined, isLoading: true });

    render(<CategorySection category={category} />);

    expect(screen.getByTestId('category-skeleton')).toBeInTheDocument();
  });

  test('데이터가 없으면 아무것도 렌더링되지 않는다.', () => {
    mockUseProductSearch.mockReturnValue({ data: undefined, isLoading: false });

    const { container } = render(<CategorySection category={category} />);

    expect(container.firstChild).toBeNull();
  });

  test('데이터가 있으면 제목/서브카테고리와 슬라이스 결과가 렌더링된다.', () => {
    mockUseProductSearch.mockReturnValue({
      isLoading: false,
      data: Array.from({ length: 10 }, (_, i) => ({ productId: i + 1 })),
    });

    render(<CategorySection category={category} />);

    expect(screen.getByText('채소')).toBeInTheDocument();
    expect(screen.getByText('상추')).toBeInTheDocument();
    expect(screen.getByText('오이')).toBeInTheDocument();

    expect(screen.getByTestId('featured')).toHaveTextContent('featured:6');
    expect(screen.getByTestId('rest')).toHaveTextContent('rest:4');
  });
});
