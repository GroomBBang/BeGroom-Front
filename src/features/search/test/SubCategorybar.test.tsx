import SubCategorybar from '@/features/search/components/SubCategorybar';
import { render, screen } from '@testing-library/react';

describe('SubCategorybar', () => {
  test('1. 카테고리 클릭 시 올바른 링크 주소가 생성된다', () => {
    const subCategories = [
      { id: '2', label: '과일' },
      { id: '3', label: '채소' },
    ];

    render(<SubCategorybar subCategories={subCategories} categoryId="2" />);

    const link = screen.getByRole('link', { name: '과일' });

    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining('/categories/2?sort=wishlistCount%2Cdesc&page=0&size=30'),
    );
  });
});
