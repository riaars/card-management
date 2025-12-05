export interface CardSummaryDto {
  id: string;
  maskedNumber: string;
  status: 'inactive' | 'active' | 'blocked';
  imageUrl: string | null;
  creditLimit: number;
  currency: string;
}

export interface InvoiceDto {
  id: string;
  cardId: string;
  status: 'due' | 'overdue' | 'paid';
  dueDate: Date;
  amountDue: number;
  currency: string;
}

export interface TransactionDto {
  id: string;
  cardId: string;
  description: string;
  postedAt: Date;
  amount: number;
  currency: string;
  category: string | null;
  dataPointsSummary: string | null;
}

export interface SpendSummaryItemDto {
  cardId: string;
  creditLimit: number;
  spentThisMonth: number;
  remaining: number;
  currency: string;
}

export interface DashboardResponseDto {
  companyId: string;
  cards: CardSummaryDto[];
  invoices: InvoiceDto[];
  latestTransactions: TransactionDto[];
  spendSummary: SpendSummaryItemDto[];
}
