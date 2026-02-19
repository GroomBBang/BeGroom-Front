// CategoryProductList.test.tsx

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryProductList from '../components/catalog/CategoryProductList';

jest.mock('../components/catalog/CategoryProductCard', () => ({
  __esModule: true,
  default: ({ product }: any) => <div data-testid="product-card">{product.productId}</div>,
}));

describe('카테고리 상품 리스트 (CategoryProductList)', () => {
  const products = Array.from({ length: 10 }, (_, i) => ({
    productId: i + 1,
  })) as any;

  test('상품이 없으면 렌더링되지 않는다.', () => {
    const { container } = render(<CategoryProductList products={[]} />);
    expect(container.firstChild).toBeNull();
  });

  test('초기에는 6개 상품이 렌더링된다.', () => {
    render(<CategoryProductList products={products} />);
    expect(screen.getAllByTestId('product-card')).toHaveLength(6);
  });

  test('다음 버튼 클릭 시 다음 페이지로 이동한다.', async () => {
    const user = userEvent.setup();
    render(<CategoryProductList products={products} />);

    await user.click(screen.getByRole('button', { name: '다음 배너' }));

    const cards = screen.getAllByTestId('product-card');
    expect(cards[0]).toHaveTextContent('7');
  });

  test('이전 버튼 클릭 시 마지막 페이지로 순환한다.', async () => {
    const user = userEvent.setup();
    render(<CategoryProductList products={products} />);

    await user.click(screen.getByRole('button', { name: '이전 배너' }));

    const cards = screen.getAllByTestId('product-card');
    expect(cards[0]).toHaveTextContent('7');
  });
});
