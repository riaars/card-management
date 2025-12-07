export interface CardType {
  id: string;
  companyId: string;
  maskedNumber: string;
  status: "inactive" | "active" | "blocked";
  imageUrl: string | null;
  creditLimit: number;
  currency: string;
  createdAt: string;
  expiry: string;
  cardHolderName?: string;
  isActive?: boolean;
  cardType?: string;
}

export interface Invoice {
  id: string;
  cardId: string;
  status: "due" | "overdue" | "paid";
  dueDate: string;
  amountDue: number;
  currency: string;
  createdAt: string;
}

export type Transaction = {
  id: string;
  cardId: string;
  description: string;
  postedAt: string;
  amount: number;
  currency: string;
  category: string | null;
  dataPointsSummary: string | null;
  createdAt: string;
};

export interface SpendSummaryItem {
  cardId: string;
  creditLimit: number;
  spentThisMonth: number;
  remaining: number;
  currency: string;
}

export type Company = {
  id: string;
  name: string;
};
