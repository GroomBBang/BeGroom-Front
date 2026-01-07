export type CashCardStatus = 'available' | 'soon' | 'soldout';

export interface CashCardItem {
  id: string;
  tagLabel: string;
  title: string;
  condition: string;
  due: string;
  claimed: number;
  total: number;
  status: CashCardStatus;
}
