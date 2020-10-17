import { Interval } from "date-fns";

export enum AssetType {
  Cash = "Cash",
  Checking = "Checking",
  Investment = "Investment",
  Merchant = "Merchant",
  Other = "Other",
  PayPal = "PayPal",
  Savings = "Savings",
}

export interface Asset {
  type: AssetType;
  liquid: boolean;
}

export enum LiabilityType {
  CreditCard = "CreditCard",
  LineOfCredit = "LineOfCredit",
  Mortgage = "Mortgage",
  Other = "Other",
}

export interface Liability {
  type: LiabilityType;
  apr?: number;
}

export type AccountType = Asset | Liability;

export interface Account {
  type: AccountType;
  name: string;
  balance: number;
}

export interface ExpenseTotal {
  category: string;
  period: Interval;
  amount: number;
}

export interface IncomeTotal {
  period: Interval;
  amount: number;
}

export interface MarketAssumptions {
  flexFiWithdrawalRate: number;
  fiWithdrawalRate: number;
  fatFiWithdrawalRate: number;
  inflationAdjustedGrowthRate: number;
}
