import { productListAPI } from '@/features/product/api/productList.api';
import { render, screen, waitFor } from '@testing-library/react';
import ProductList from '../components/ProductList';

jest.mock('../../product/api/productList.api', () => ({
  productListAPI: {
    searchProducts: jest.fn(),
  },
}));

jest.mock('../components/ProductListLoading', () => ({
  __esModule: true,
  default: () => <div data-testid="product-list-loading" />,
}));

jest.mock('../../product/components/ProductCard', () => ({
  __esModule: true,
  default: () => <div data-testid="product-card" />,
}));

jest.mock('../components/Pagination', () => ({
  __esModule: true,
  default: () => <div data-testid="pagination" />,
}));

const onAlertModal = jest.fn();
jest.mock('../../../shared/stores/useModalStore', () => ({
  __esModule: true,
  useModalStore: () => ({
    onAlertModal: onAlertModal,
  }),
}));

const mockSearchProducts = productListAPI.searchProducts as unknown as jest.Mock;

describe('ProductList', () => {
  const baseProps = {
    keyword: 'apple',
    categoryIds: 1,
    filters: {
      brandIds: [],
      deliveryTypes: [],
      packagingTypes: [],
      excludeSoldOut: false,
      page: 0,
      size: 30,
      sort: 'id,desc',
    },
    setPage: jest.fn(),
  } as any;

  beforeEach(() => {
    mockSearchProducts.mockReset();
  });

  test('1. 로딩 시 스켈레톤이 보인다', async () => {
    mockSearchProducts.mockReturnValue(new Promise(() => {}));

    render(<ProductList {...baseProps} />);

    expect(await screen.findByTestId('product-list-loading')).toBeInTheDocument();
  });

  test('2. 데이터 있으면 리스트가 렌더링된다', async () => {
    mockSearchProducts.mockResolvedValue({
      content: [{ productId: 1 }, { productId: 2 }],
      totalPages: 3,
    });

    render(<ProductList {...baseProps} />);

    expect(await screen.findAllByTestId('product-card')).toHaveLength(2);
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
    expect(screen.queryByTestId('product-list-loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('alert-modal')).not.toBeInTheDocument();
  });

  test('3. 데이터 없으면 "검색 결과가 없습니다."가 보인다', async () => {
    mockSearchProducts.mockResolvedValue({
      content: [],
      totalPages: 1,
    });

    render(<ProductList {...baseProps} />);

    expect(await screen.findByText('검색 결과가 없습니다.')).toBeInTheDocument();
    expect(screen.queryByTestId('product-list-loading')).not.toBeInTheDocument();
    expect(screen.queryByTestId('product-card')).not.toBeInTheDocument();
    expect(screen.queryByTestId('pagination')).not.toBeInTheDocument();
    expect(screen.queryByTestId('alert-modal')).not.toBeInTheDocument();
  });

  test('4. 오류나면 에러 모달이 뜬다', async () => {
    mockSearchProducts.mockRejectedValue(new Error('boom'));

    render(<ProductList {...baseProps} />);

    await waitFor(() => {
      expect(onAlertModal).toHaveBeenCalledWith('상품을 불러오지 못했습니다.');
    });
    expect(screen.queryByTestId('product-list-loading')).not.toBeInTheDocument();
  });
});
