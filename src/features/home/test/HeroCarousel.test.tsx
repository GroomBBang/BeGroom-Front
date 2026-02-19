import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import HeroCarousel from '../components/hero/HeroCarousel';

describe('HeroCarousel', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  test('초기 렌더 시 1 / total 이 표시된다', () => {
    render(<HeroCarousel />);
    expect(screen.getByText(/1 \/ 7/)).toBeInTheDocument();
  });

  test('next 버튼 클릭 시 인덱스가 증가한다', async () => {
    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });
    render(<HeroCarousel />);
    await user.click(screen.getByRole('button', { name: '다음' }));
    expect(screen.getByText(/2 \/ 7/)).toBeInTheDocument();
  });

  test('prev 버튼 클릭 시 마지막으로 순환한다', async () => {
    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });
    render(<HeroCarousel />);
    await user.click(screen.getByRole('button', { name: '이전' }));
    expect(screen.getByText(/7 \/ 7/)).toBeInTheDocument();
  });

  test('3초 후 자동으로 다음 슬라이드로 이동한다', async () => {
    render(<HeroCarousel />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText(/2 \/ 7/)).toBeInTheDocument();
  });

  test('hover 시 autoplay 가 멈춘다', async () => {
    render(<HeroCarousel />);
    const region = screen.getByRole('region');

    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });

    await user.hover(region);

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(screen.getByText(/1 \/ 7/)).toBeInTheDocument();
  });

  test('hover 후 mouseLeave 시 autoplay 가 다시 시작된다', async () => {
    render(<HeroCarousel />);
    const region = screen.getByRole('region');

    const user = userEvent.setup({
      advanceTimers: jest.advanceTimersByTime,
    });

    await user.hover(region);
    await user.unhover(region);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(screen.getByText(/2 \/ 7/)).toBeInTheDocument();
  });

  test('unmount 시 timer 가 정리된다', () => {
    const { unmount } = render(<HeroCarousel />);
    const clearSpy = jest.spyOn(window, 'clearInterval');

    unmount();

    expect(clearSpy).toHaveBeenCalled();
  });
});
