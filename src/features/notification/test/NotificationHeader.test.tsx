import { useAuthStore } from '@/features/auth/stores/useAuthStore';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import notificationAPI from '../apis/notification.api';
import NotificationHeader from '../components/NotificationHeader';

jest.mock('../../auth/stores/useAuthStore', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('../apis/notification.api', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseAuthStore = useAuthStore as unknown as jest.Mock;
const mockNotificationAPI = notificationAPI as unknown as jest.Mock;
const mockReadAllNotification = jest.fn();

describe('NotificationHeader render', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockNotificationAPI.mockReturnValue({
      readAllNotification: mockReadAllNotification,
    });
  });

  describe('1. 모두 읽음 표시 버튼', () => {
    test('1-1. 읽지 않은 알림이 있을 경우 모두 읽음 표시 버튼이 활성화된다.', async () => {
      mockUseAuthStore.mockReturnValue({
        unreadNotisCount: 1,
        resetNotisCount: jest.fn(),
      });

      render(<NotificationHeader />);

      const button = screen.getByRole('button', { name: /모두 읽음 표시/ });
      expect(button).toBeEnabled();
    });

    test('1-2. 읽지 않은 알림이 없을 경우 모두 읽음 표시 버튼이 비활성화된다.', async () => {
      mockUseAuthStore.mockReturnValue({
        unreadNotisCount: 0,
        resetNotisCount: jest.fn(),
      });

      render(<NotificationHeader />);

      const button = screen.getByRole('button', { name: /모두 읽음 표시/ });
      expect(button).toBeDisabled();
    });
  });

  describe('2. 모두 읽음 표시 버튼 클릭', () => {
    test('2-1. 모두 읽음 표시 버튼 클릭 시 handleMarkAllRead가 호출된다.', async () => {
      const user = userEvent.setup();
      mockUseAuthStore.mockReturnValue({
        unreadNotisCount: 1,
        resetNotisCount: jest.fn(),
      });

      render(<NotificationHeader />);

      const button = screen.getByRole('button', { name: /모두 읽음 표시/ });
      await user.click(button);

      expect(mockReadAllNotification).toHaveBeenCalledTimes(1);
    });
  });
});
