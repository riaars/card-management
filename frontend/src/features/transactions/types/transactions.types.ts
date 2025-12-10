export interface Transaction {
  id: string;
  cardId: string;
  description: string;
  postedAt: string;
  amount: number;
  currency: string;
  category: string | null;
  dataPointsSummary: string | null;
  createdAt: string;
}

export interface Transactions {
  transactions: Transaction[];
  totalCount?: number;
}
