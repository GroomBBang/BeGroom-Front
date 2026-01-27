import { renderIcon } from '@/features/notification/utils/NotificationUtils';
import { render } from '@testing-library/react';

describe('renderIcon render', () => {
  test('1. ORDER 타입일 때 info 스타일과 아이콘이 렌더링된다', () => {
    const { container } = render(<div>{renderIcon('ORDER')}</div>);
    const iconWrapper = container.firstChild?.firstChild as HTMLElement;

    expect(iconWrapper.querySelector('svg')).toBeInTheDocument();
    expect(iconWrapper).toHaveClass('bg-info/10');
    expect(iconWrapper).toHaveClass('text-info');
  });

  test('2. AD 타입일 때 primary 스타일이 렌더링된다', () => {
    const { container } = render(<div>{renderIcon('AD')}</div>);
    const iconWrapper = container.firstChild?.firstChild as HTMLElement;

    expect(iconWrapper).toHaveClass('bg-primary-100');
    expect(iconWrapper).toHaveClass('text-primary-600');
  });

  test('3. NOTICE 타입일 때 success 스타일이 렌더링된다', () => {
    const { container } = render(<div>{renderIcon('NOTICE')}</div>);
    const iconWrapper = container.firstChild?.firstChild as HTMLElement;

    expect(iconWrapper).toHaveClass('bg-success/10');
    expect(iconWrapper).toHaveClass('text-success');
  });
});
