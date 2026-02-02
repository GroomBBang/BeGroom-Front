// src/features/product/test/ProductDetailContainer.test.tsx
import { render, screen } from '@testing-library/react';
import ProductDetailContainer from '../components/ProductDetailContainer';
import { useProductDetail } from '../hooks/useProductDetail';

jest.mock('../hooks/useProductDetail', () => ({
  __esModule: true,
  useProductDetail: jest.fn(),
}));

jest.mock('../components/ProductDetailLoading', () => ({
  __esModule: true,
  default: () => <div data-testid="product-detail-loading" />,
}));

jest.mock('../components/ProductDetailMain', () => ({
  __esModule: true,
  default: () => <div data-testid="product-detail-main" />,
}));

jest.mock('../components/ProductDetailTab', () => ({
  __esModule: true,
  default: () => <div data-testid="product-detail-tab" />,
}));

jest.mock('../components/ProductEmpty', () => ({
  __esModule: true,
  default: () => <div data-testid="product-empty" />,
}));

const mockUseProductDetail = useProductDetail as unknown as jest.Mock;

describe('상세 조회 (ProductDetailContainer)', () => {
  const base = {
    product: undefined,
    isLoading: false,
    error: null,
    clearError: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('1. 데이터 수신 전 로딩 UI가 렌더링된다.', () => {
    mockUseProductDetail.mockReturnValue({
      ...base,
      isLoading: true,
    });

    render(<ProductDetailContainer id="1" />);

    expect(screen.getByTestId('product-detail-loading')).toBeInTheDocument();
    expect(screen.queryByTestId('product-detail-main')).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-empty')).not.toBeInTheDocument();
  });

  test('2-1. 데이터 있으면 상품 상세 화면이 렌더링된다.', () => {
    mockUseProductDetail.mockReturnValue({
      ...base,
      isLoading: false,
      product: { productId: 1 } as any,
    });

    render(<ProductDetailContainer id="1" />);

    expect(screen.getByTestId('product-detail-main')).toBeInTheDocument();
    expect(screen.getByTestId('product-detail-tab')).toBeInTheDocument();
    expect(screen.queryByTestId('product-detail-loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-empty')).not.toBeInTheDocument();
    expect(screen.queryByTestId('alert-modal')).not.toBeInTheDocument();
  });

  test('2-2. 데이터 없으면 알림 모달과 ProductEmpty 화면이 렌더링된다.', () => {
    mockUseProductDetail.mockReturnValue({
      ...base,
      isLoading: false,
      product: undefined,
    });

    render(<ProductDetailContainer id="9999" />);

    expect(screen.getByTestId('product-empty')).toBeInTheDocument();
    expect(screen.queryByTestId('product-detail-main')).not.toBeInTheDocument();
  });

  test('2-3. 데이터 수신 후 상품 상세 화면이 렌더링된다.', () => {
    mockUseProductDetail
      .mockReturnValueOnce({
        ...base,
        isLoading: true,
        product: undefined,
      })
      .mockReturnValueOnce({
        ...base,
        isLoading: false,
        product: { productId: 1 } as any,
      });

    const { rerender } = render(<ProductDetailContainer id="1" />);

    expect(screen.getByTestId('product-detail-loading')).toBeInTheDocument();

    rerender(<ProductDetailContainer id="1" />);

    expect(screen.getByTestId('product-detail-main')).toBeInTheDocument();
    expect(screen.getByTestId('product-detail-tab')).toBeInTheDocument();
    expect(screen.queryByTestId('product-detail-loading')).not.toBeInTheDocument();
  });
});
