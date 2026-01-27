import { fireEvent, render, screen } from '@testing-library/react';
import Pagination from '../components/Pagination';

describe('Pagination', () => {
  test('1-1. totalPage가 1이면 pagination이 보이지 않는다', () => {
    const onChange = jest.fn();

    render(<Pagination page={1} totalPages={1} onChange={onChange} />);

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  test('1-2. totalPage가 2이상이면 pagination이 보인다', () => {
    const onChange = jest.fn();

    render(<Pagination page={1} totalPages={2} onChange={onChange} />);

    expect(screen.queryByRole('navigation')).toBeInTheDocument();
  });

  test('2. 페이지 버튼 클릭 시 onChange가 해당 페이지로 호출된다', () => {
    const onChange = jest.fn();

    render(<Pagination page={1} totalPages={5} onChange={onChange} />);

    fireEvent.click(screen.getByText('3'));
    expect(onChange).toHaveBeenCalledWith(3);
  });
});
