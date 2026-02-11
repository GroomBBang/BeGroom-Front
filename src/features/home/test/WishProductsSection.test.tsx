import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import myAPI from '@/features/user/apis/my.api';
import { render, screen, waitFor } from '@testing-library/react';
import WishProductsSection from '../components/personalized/WishProductsSection';

jest.mock('../../auth/stores/useAuthStore');
jest.mock('../../user/apis/my.api');

jest.mock('../components/personalized/WishProductSkeleton', () => ({
  __esModule: true,
  default: () => <div data-testid="wish-skeleton" />,
}));

jest.mock('../components/personalized/WishProductsCarousel', () => ({
  __esModule: true,
  default: ({ wish }: any) => <div data-testid="wish-carousel">length:{wish.length}</div>,
}));

const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
const mockMyAPI = myAPI as unknown as jest.Mock;

describe('찜 상품 섹션 (WishProductsSection)', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('로그인하지 않으면 아무것도 렌더링되지 않는다.', () => {
    mockUseAuthStore.mockReturnValue({ isLoggedIn: false });

    mockMyAPI.mockReturnValue({
      fetchMyWish: jest.fn().mockResolvedValue({ result: { wish: [] } }),
    });

    const { container } = render(<WishProductsSection />);
    expect(container.firstChild).toBeNull();
  });

  test('로그인 상태에서 로딩 중이면 스켈레톤이 렌더링된다.', () => {
    mockUseAuthStore.mockReturnValue({ isLoggedIn: true });

    mockMyAPI.mockReturnValue({
      fetchMyWish: jest.fn(() => new Promise(() => {})), // resolve 안 됨
    });

    render(<WishProductsSection />);

    expect(screen.getByTestId('wish-skeleton')).toBeInTheDocument();
  });

  test('찜 데이터가 없으면 렌더링되지 않는다.', async () => {
    mockUseAuthStore.mockReturnValue({ isLoggedIn: true });

    mockMyAPI.mockReturnValue({
      fetchMyWish: jest.fn().mockResolvedValue({
        result: { wish: [] },
      }),
    });

    const { container } = render(<WishProductsSection />);

    await waitFor(() => {
      expect(container.firstChild).toBeNull();
    });
  });

  test('찜 데이터가 있으면 캐러셀이 렌더링된다.', async () => {
    mockUseAuthStore.mockReturnValue({ isLoggedIn: true });

    mockMyAPI.mockReturnValue({
      fetchMyWish: jest.fn().mockResolvedValue({
        result: { wish: [{ id: 1 }, { id: 2 }] },
      }),
    });

    render(<WishProductsSection />);

    await waitFor(() => {
      expect(screen.getByTestId('wish-carousel')).toBeInTheDocument();
      expect(screen.getByText('length:2')).toBeInTheDocument();
    });
  });
});
