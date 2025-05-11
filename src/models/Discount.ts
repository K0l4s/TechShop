export interface Discount {
  id: number;
  code: string;
  value: number;
  quantity: number;
  startDate: string;
  endDate: string;
  active: boolean;
}
