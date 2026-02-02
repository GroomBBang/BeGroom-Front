// src/features/product/components/ProductDetailMain.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductDetailMain from '../components/ProductDetailMain';

const pushMock = jest.fn();
jest.mock('next/navigation', () => ({ useRouter: () => ({ push: pushMock }) }));

jest.mock('../../../shared/lib/format', () => ({ formatWon: (v: number) => String(v) }));

jest.mock('../../auth/stores/useAuthStore', () => ({
  useAuthStore: () => ({ isLoggedIn: true }),
}));

const addToCartMock = jest.fn();
jest.mock('../hooks/useAddToCart', () => ({ useAddToCart: () => ({ addToCart: addToCartMock }) }));

const useProductOptionsMock = jest.fn();
jest.mock('../hooks/useProductOption', () => ({
  useProductOptions: (d: any) => useProductOptionsMock(d),
}));

const useWishlistToggleMock = jest.fn();
jest.mock('../hooks/useWishlistToggle', () => ({
  useWishlistToggle: (args: any) => useWishlistToggleMock(args),
}));

jest.mock('../components/ProductOptionSection', () => () => null);

const onAlertModal = jest.fn();
jest.mock('../../../shared/stores/useModalStore', () => ({
  __esModule: true,
  useModalStore: () => ({
    onAlertModal: onAlertModal,
  }),
}));

const baseProduct: any = {
  productId: 10,
  name: '사과',
  brand: '가야농장',
  shortDescription: '맛있는 사과',
  mainImageUrl: '/apple.png',
  isWishlisted: false,
  wishlistCount: 3,
  salesPrice: 1000,
  discountedPrice: 800,
  details: [],
};

beforeEach(() => {
  jest.clearAllMocks();
  useProductOptionsMock.mockReturnValue({
    hasOptions: true,
    details: [],
    selected: [{ productDetailId: 1, qty: 2 }],
    totalPrice: 1600,
    getUnitPrice: (d: any) => d.discountedPrice ?? d.basePrice,
    onSelectOption: jest.fn(),
    dec: jest.fn(),
    inc: jest.fn(),
    remove: jest.fn(),
  });
  useWishlistToggleMock.mockReturnValue({ liked: false, count: 3, toggle: jest.fn() });
});

describe('상세 조회 (ProductDetailMain)', () => {
  test('1. 위시리스트 버튼을 클릭하면 toggle 함수가 호출된다.', async () => {
    const user = userEvent.setup();
    const toggle = jest.fn();
    useWishlistToggleMock.mockReturnValueOnce({ liked: false, count: 3, toggle });

    render(<ProductDetailMain product={baseProduct} />);
    await user.click(screen.getByLabelText('찜하기'));

    expect(toggle).toHaveBeenCalled();
  });

  test('2. 로그인 필요 에러 모달 확인 콜백 실행 시 로그인 페이지로 이동한다', async () => {
    const user = userEvent.setup();

    useWishlistToggleMock.mockImplementationOnce(() => ({
      liked: false,
      count: 3,
      toggle: () =>
        onAlertModal('해당 기능은 로그인 후 이용해주세요.', () => pushMock('/auth?mode=login')),
    }));

    render(<ProductDetailMain product={baseProduct} />);
    await user.click(screen.getByLabelText('찜하기'));

    expect(onAlertModal).toHaveBeenCalledWith(
      '해당 기능은 로그인 후 이용해주세요.',
      expect.any(Function),
    );

    const [, confirmCallback] = onAlertModal.mock.calls[0];
    await confirmCallback();

    expect(pushMock).toHaveBeenCalledWith('/auth?mode=login');
  });

  test('3. 장바구니 담기 버튼을 클릭하면 addToCart 함수가 호출된다.', async () => {
    const user = userEvent.setup();
    render(<ProductDetailMain product={baseProduct} />);
    await user.click(screen.getByRole('button', { name: '장바구니 담기' }));

    expect(addToCartMock).toHaveBeenCalledWith([{ productDetailId: 1, qty: 2 }]);
  });
});
