import { render, screen } from '@testing-library/react';
import NotificationMainContainer from '../components/NotificationMainContainer';
import { useNotification } from '../hooks/useNotification';

jest.mock('../hooks/useNotification', () => ({
  useNotification: jest.fn(),
}));

jest.mock('../components/NotificationMainEmptyPlaceHolder', () => ({
  __esModule: true,
  default: () => <div data-testid="notification-empty-place-holder" />,
}));

jest.mock('../components/NotificationList', () => ({
  __esModule: true,
  default: () => <div data-testid="notification-list" />,
}));

jest.mock('../components/NotificationListLoading', () => ({
  __esModule: true,
  default: () => <div data-testid="notification-loading" />,
}));

const mockUseNotification = useNotification as unknown as jest.Mock;

describe('내 알림 리스트 조회', () => {
  beforeEach(() => {
    mockUseNotification.mockReset();
  });

  test('1. 데이터 수신 전 로딩 UI 렌더링', () => {
    mockUseNotification.mockReturnValue({
      isLoading: true,
      items: [],
    });

    render(<NotificationMainContainer />);

    expect(screen.getByTestId('notification-loading')).toBeInTheDocument();
  });

  test('2-1. 내 알림 리스트에 알림이 있으면 NotificationListItem 렌더링', () => {
    mockUseNotification.mockReturnValue({
      isLoading: false,
      items: { notifications: [{ id: 1 }] },
    });

    render(<NotificationMainContainer />);

    expect(screen.getByTestId('notification-list')).toBeInTheDocument();
    expect(screen.queryByTestId('notification-loading')).not.toBeInTheDocument();
  });

  test('2-2. 내 알림 리스트가 비어있으면 EmptyPlaceHolder 렌더링', () => {
    mockUseNotification.mockReturnValue({
      isLoading: false,
      items: { notifications: [] },
    });

    render(<NotificationMainContainer />);

    expect(screen.getByTestId('notification-empty-place-holder')).toBeInTheDocument();
    expect(screen.queryByTestId('notification-loading')).not.toBeInTheDocument();
  });

  test('2-3. 조회 실패 시 오류 UI 렌더링', () => {
    mockUseNotification.mockReturnValue({
      isLoading: false,
      items: [],
      error: '알림 내역 조회에 실패했습니다.',
      clearError: jest.fn(),
    });

    render(<NotificationMainContainer />);

    expect(screen.getByText('알림 내역 조회에 실패했습니다.')).toBeInTheDocument();
  });
});
