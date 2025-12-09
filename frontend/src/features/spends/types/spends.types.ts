export interface SpendSummaryItem {
  cardId: string;
  creditLimit: number;
  spentThisMonth: number;
  remaining: number;
  currency: string;
}
