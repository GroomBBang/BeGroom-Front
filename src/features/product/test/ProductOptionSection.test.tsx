// src/features/product/test/ProductOptionsSection.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductOptionsSection from '../components/ProductOptionSection';

jest.mock('../../../shared/lib/format', () => ({ formatWon: (v: number) => String(v) }));

const baseProps: any = {
  hasOptions: true,
  details: [{ productDetailId: 1, name: '옵션A', isAvailable: true }],
  selected: [
    {
      productDetailId: 1,
      name: '옵션A',
      basePrice: 1000,
      discountedPrice: 800,
      quantity: 2, // 재고
      isAvailable: true,
      qty: 1, // 현재 수량
    },
  ],
  onSelectOption: jest.fn(),
  dec: jest.fn(),
  inc: jest.fn(),
  remove: jest.fn(),
  getUnitPrice: (d: any) => d.discountedPrice ?? d.basePrice,
};

const onAlertModal = jest.fn();
jest.mock('../../../shared/stores/useModalStore', () => ({
  __esModule: true,
  useModalStore: () => ({
    onAlertModal: onAlertModal,
  }),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe('상품 옵션 섹션 (핵심)', () => {
  test('1. 수량이 1개이면 감소 버튼이 비활성화', () => {
    render(<ProductOptionsSection {...baseProps} />);
    expect(screen.getByLabelText('수량 감소')).toBeDisabled();
  });

  test('2. 수량이 재고 초과 시 증가 버튼 클릭 시 알림과 함께 모달여는 함수 호출', async () => {
    const user = userEvent.setup();
    const props = {
      ...baseProps,
      selected: [{ ...baseProps.selected[0], qty: 2, quantity: 2 }],
    };

    render(<ProductOptionsSection {...props} />);

    await user.click(screen.getByLabelText('수량 증가'));
    expect(props.inc).not.toHaveBeenCalled();
    expect(onAlertModal).toHaveBeenCalledWith('선택하신 상품의 재고가 부족합니다.');
  });
});
