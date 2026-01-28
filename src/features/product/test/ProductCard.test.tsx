import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../components/ProductCard';

const mockPush = jest.fn();

jest.mock('next/navigation', () => ({
  useRouter: () => ({ push: mockPush }),
}));

const mockUseAuthStore = jest.fn();

jest.mock('../../auth/stores/useAuthStore', () => ({
  useAuthStore: () => mockUseAuthStore(),
}));

const mockAddWishList = jest.fn().mockResolvedValue(undefined);

jest.mock('../api/product.api', () => ({
  __esModule: true,
  default: jest.fn(() => ({
    addWishList: mockAddWishList,
  })),
}));

describe('ProductCard', () => {
  const baseProduct = {
    productId: 10,
    name: '사과',
    brand: '가야농장',
    shortDescription: '맛있는 사과',
    mainImageUrl: '/apple.png',
    salesPrice: 1000,
    discountedPrice: null,
    discountRate: 0,
    isWishlisted: false,
    wishlistCount: 3,
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuthStore.mockReturnValue({ isLoggedIn: true });
  });

  test('1. 좋아요 클릭 시 좋아요 추가 api가 호출된다', async () => {
    const user = userEvent.setup();

    render(<ProductCard product={baseProduct} />);

    await user.click(screen.getByRole('button', { name: '좋아요' }));

    expect(mockAddWishList).toHaveBeenCalledTimes(1);
    expect(mockAddWishList).toHaveBeenCalledWith(10);
  });

  test('2. 좋아요 외 영역 클릭 시 링크 href가 상품 상세로 걸려있다', async () => {
    const { container } = render(<ProductCard product={baseProduct} />);

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/products/10');
  });

  test('3. 좋아요 클릭 시 UI 상태가 변경된다 (좋아요 수 증가 + 스타일 변경)', async () => {
    const user = userEvent.setup();

    render(<ProductCard product={baseProduct} />);

    expect(screen.getByText('3')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: '좋아요' }));
    expect(screen.getByText('4')).toBeInTheDocument();

    const countSpan = screen.getByText('4');
    expect(countSpan).toHaveClass('text-orange-500');

    await user.click(screen.getByRole('button', { name: '좋아요' }));
    expect(screen.getByText('3')).toBeInTheDocument();
  });
});
