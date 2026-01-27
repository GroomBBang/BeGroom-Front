import { useAuthStore } from '@/features/auth/stores/useAuthStore'; // 경로 확인
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { renderHook, waitFor } from '@testing-library/react';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { useSSE } from '../hooks/useSSE';

jest.mock('@microsoft/fetch-event-source', () => ({
  fetchEventSource: jest.fn(),
}));

jest.mock('js-cookie', () => ({
  get: jest.fn(),
}));

jest.mock('react-hot-toast', () => ({
  success: jest.fn(),
}));

jest.mock('../../features/auth/stores/useAuthStore');

describe('useSSE Hook', () => {
  const mockIncreaseNotisCount = jest.fn();
  const mockFetchEventSource = fetchEventSource as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    (Cookies.get as jest.Mock).mockReturnValue('fake-jwt-token');

    (useAuthStore as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector) return selector({ isLoggedIn: true });
      return { increaseNotisCount: mockIncreaseNotisCount };
    });
  });

  test('1. SSE 연결이 정상적으로 시도된다.', async () => {
    renderHook(() => useSSE());

    await waitFor(() => {
      expect(mockFetchEventSource).toHaveBeenCalledTimes(1);
      expect(mockFetchEventSource).toHaveBeenCalledWith(
        expect.stringContaining('/noti/subscribe'),
        expect.objectContaining({
          headers: { Authorization: 'Bearer fake-jwt-token' },
        }),
      );
    });
  });

  test('2. 알림 메시지(notification)가 오면 Toast가 뜨고, 스토어가 업데이트된다.', async () => {
    renderHook(() => useSSE());
    const callArgs = mockFetchEventSource.mock.calls[0];
    const options = callArgs[1];

    const mockMessage = {
      event: 'notification',
      data: JSON.stringify({ message: '새로운 알림이 도착했습니다!' }),
    };

    await options.onmessage(mockMessage);

    expect(toast.success).toHaveBeenCalledWith('새로운 알림이 도착했습니다!');
    expect(mockIncreaseNotisCount).toHaveBeenCalledTimes(1);
  });

  test('3. 연결이 성공했을 때, 단순 연결 이벤트를 수신하면 토스트 메시지를 띄우지 않는다.', async () => {
    renderHook(() => useSSE());

    const options = mockFetchEventSource.mock.calls[0][1];

    const pureConnectMessage = {
      event: 'connect',
    };

    await options.onmessage(pureConnectMessage);

    expect(toast.success).not.toHaveBeenCalled();
    expect(mockIncreaseNotisCount).not.toHaveBeenCalled();
  });

  test('4. 연결이 성공했을 때, 읽지 않은 알림 이벤트를 수신하면 해당 정보가 요약된 토스트 메시지를 띄운다.', async () => {
    renderHook(() => useSSE());

    const options = mockFetchEventSource.mock.calls[0][1];

    const unreadNotificationMessage = {
      event: 'unread-notification',
      data: JSON.stringify({ message: '읽지 않은 알림이 5개 있습니다!' }),
    };

    await options.onmessage(unreadNotificationMessage);

    expect(toast.success).toHaveBeenCalledWith('읽지 않은 알림이 5개 있습니다!');
    expect(mockIncreaseNotisCount).toHaveBeenCalledTimes(1);
  });

  test('5. 하트비트 이벤트를 수신하면 토스트 메시지를 띄우지 않는다.', async () => {
    renderHook(() => useSSE());

    const options = mockFetchEventSource.mock.calls[0][1];

    const heartbeatMessage = {
      event: 'heartbeat',
    };

    await options.onmessage(heartbeatMessage);

    expect(toast.success).not.toHaveBeenCalled();
    expect(mockIncreaseNotisCount).not.toHaveBeenCalled();
  });

  test('6. 연결 종료 이벤트를 수신하면 토스트 메시지를 띄우지 않는다.', async () => {
    renderHook(() => useSSE());

    const options = mockFetchEventSource.mock.calls[0][1];

    const closeMessage = {
      event: 'close',
    };

    await options.onmessage(closeMessage);

    expect(toast.success).not.toHaveBeenCalled();
    expect(mockIncreaseNotisCount).not.toHaveBeenCalled();
  });

  test('7. TCP 재연결 후 유실된 알림 개수 이벤트를 수신하면 요약된 토스트 메시지를 띄운다.', async () => {
    renderHook(() => useSSE());

    const callArgs = mockFetchEventSource.mock.calls[0];
    const options = callArgs[1];

    const missedMessage = {
      event: 'recovered-notification',
      data: JSON.stringify({ message: '5개의 새 알림이 도착했습니다!' }),
    };

    await options.onmessage(missedMessage);

    expect(toast.success).toHaveBeenCalledWith('5개의 새 알림이 도착했습니다!');
    expect(mockIncreaseNotisCount).toHaveBeenCalledTimes(1);
  });
});
