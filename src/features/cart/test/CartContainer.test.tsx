import { render, screen } from '@testing-library/react';
import CartContainer from '../components/CartContainer';
import { useCart } from '../hooks/useCart';

jest.mock('../hooks/useCart', () => ({
  useCart: jest.fn(),
}));

jest.mock('../components/CartMain', () => ({
  __esModule: true,
  default: ({ cart }: any) => <div data-testid="cart-main" />,
}));

jest.mock('../components/CartEmpty', () => ({
  __esModule: true,
  default: () => <div data-testid="cart-empty" />,
}));

jest.mock('../components/CartLoading', () => ({
  __esModule: true,
  default: () => <div data-testid="cart-loading" />,
}));

const mockUseCart = useCart as unknown as jest.Mock;

describe('장바구니 정보 조회 (CartContainer)', () => {
  beforeEach(() => {
    mockUseCart.mockReset();
  });

  test('1. 데이터 수신 전 로딩 UI 렌더링', () => {
    mockUseCart.mockReturnValue({
      isLoading: true,
      items: [],
    });

    render(<CartContainer />);

    expect(screen.getByTestId('cart-loading')).toBeInTheDocument();
  });

  test('2-1. 장바구니에 상품이 있으면 CartMain 렌더링', () => {
    mockUseCart.mockReturnValue({
      isLoading: false,
      items: [{ id: 1 }],
    });

    render(<CartContainer />);

    expect(screen.getByTestId('cart-main')).toBeInTheDocument();
    expect(screen.queryByTestId('cart-loading')).not.toBeInTheDocument();
  });

  test('2-2. 장바구니가 비어있으면 CartEmpty 렌더링', () => {
    mockUseCart.mockReturnValue({
      isLoading: false,
      items: [],
    });

    render(<CartContainer />);

    expect(screen.getByTestId('cart-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('cart-loading')).not.toBeInTheDocument();
  });
});
