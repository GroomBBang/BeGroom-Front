import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CategoryFeaturedSection from '../components/catalog/CategoryFeaturedSection';

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children }: any) => <div>{children}</div>,
}));

describe('카테고리 대표 상품 슬라이드 (CategoryFeaturedSection)', () => {
  const products = [
    { productId: 1, name: '상품1', mainImageUrl: '/1.jpg' },
    { productId: 2, name: '상품2', mainImageUrl: '/2.jpg' },
    { productId: 3, name: '상품3', mainImageUrl: '/3.jpg' },
  ] as any;

  test('상품이 없으면 렌더링되지 않는다.', () => {
    const { container } = render(<CategoryFeaturedSection products={[]} />);
    expect(container.firstChild).toBeNull();
  });

  test('초기에는 첫 번째 상품이 보인다.', () => {
    render(<CategoryFeaturedSection products={products} />);
    expect(screen.getByText('상품1')).toBeInTheDocument();
  });

  test('다음 버튼 클릭 시 슬라이드가 이동한다.', async () => {
    const user = userEvent.setup();
    render(<CategoryFeaturedSection products={products} />);

    await user.click(screen.getByRole('button', { name: '다음 배너' }));
    expect(screen.getByText('상품2')).toBeInTheDocument();
  });

  test('이전 버튼 클릭 시 마지막으로 순환한다.', async () => {
    const user = userEvent.setup();
    render(<CategoryFeaturedSection products={products} />);

    await user.click(screen.getByRole('button', { name: '이전 배너' }));
    expect(screen.getByText('상품3')).toBeInTheDocument();
  });

  test('인디케이터 클릭 시 해당 슬라이드로 이동한다.', async () => {
    const user = userEvent.setup();
    render(<CategoryFeaturedSection products={products} />);

    const indicators = screen.getAllByRole('button');
    await user.click(indicators[3]); // 첫 2개는 prev/next 버튼

    expect(screen.getByText('상품1')).toBeInTheDocument();
  });
});
