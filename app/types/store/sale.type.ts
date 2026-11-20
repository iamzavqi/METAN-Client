export type SalePayload = {
  date: string; // "2026-11-19"
  volume: number;
  pricePerCube: number;
  cash: number;
  terminal: number;
  transfer: number;
  comment?: string;
};

export type Sale = {
  _id: string;
  companyId: Company;
  userId: User;
  date: string; // "2026-11-19"

  volume: number;
  pricePerCube: number;
  cash: number;
  terminal: number;
  transfer: number;
  comment?: string;
  totalAmount: number;
  difference: number;
  status: string;
  approvedBy: User;
};

export type SaleStatus = "pending" | "approved" | "rejected";