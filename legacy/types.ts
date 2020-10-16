export enum AssetType {
  Liquid,
  Illiquid,
}

export enum AccountType {
  Investment,
  Savings,
  Checking,
}

export type Account = Asset | Debt;

export interface Asset {
  name: string;
  type: AccountType;
  assetType: AssetType;
  amount: number;
}

export enum DebtType {
  Loan,
  CreditCard,
  Mortgage,
}

export interface Debt {
  type: DebtType;
  name: string;
  amount: number;
}

export interface MarketAssumptions {
  flexFiWithdrawalRate: number;
  fiWithdrawalRate: number;
  fatFiWithdrawalRate: number;
  inflationAdjustedGrowthRate: number;
}

export enum Month {
  January = "01",
  February = "02",
  March = "03",
  April = "04",
  May = "05",
  June = "06",
  July = "07",
  August = "08",
  September = "09",
  October = "10",
  November = "11",
  December = "12",
}

export interface MonthlyRecordBase {
  name: string;
  month: Month;
  year: number;
  amount: number;
}

export enum ExpenseType {
  Discretionary = "DISCRETIONARY",
  NonDiscretionary = "NON_DISCRETIONARY",
}

export interface MonthlyExpense extends MonthlyRecordBase {
  type: ExpenseType;
}

export enum IncomeType {
  AfterTaxSalary,
  PreTaxSavings,
  Supplemental,
}

export interface MonthlyIncome extends MonthlyRecordBase {
  type: IncomeType;
}

export type MonthlyRecord = MonthlyExpense | MonthlyIncome;

export type Totallable = MonthlyExpense | MonthlyIncome | Asset | Debt;
