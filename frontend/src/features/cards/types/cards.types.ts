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
