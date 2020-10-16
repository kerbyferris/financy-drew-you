import {
  Asset,
  AssetType,
  Debt,
  DebtType,
  ExpenseType,
  MonthlyExpense,
} from "../types";
import {
  filterBy,
  netWorth,
  netWorthLiquid,
  sum,
  totalByExpenseType,
  totalByYear,
} from "..";
import { mock } from "jest-mock-extended";

describe("tests", () => {
  const expense01 = mock<MonthlyExpense>({
    name: "restaurants",
    type: ExpenseType.Discretionary,
    amount: 10,
    year: 2020,
  });
  const expense02 = mock<MonthlyExpense>({
    name: "groceries",
    type: ExpenseType.NonDiscretionary,
    amount: 20,
    year: 2020,
  });
  const expense03 = mock<MonthlyExpense>({
    name: "groceries",
    type: ExpenseType.NonDiscretionary,
    amount: 50,
    year: 2019,
  });
  const expenses = [expense01, expense02, expense03];
  const assets = [
    mock<Asset>({
      assetType: AssetType.Liquid,
      amount: 1000,
    }),
    mock<Asset>({
      assetType: AssetType.Illiquid,
      amount: 2000,
    }),
  ];
  const debts = [
    mock<Debt>({
      type: DebtType.CreditCard,
      amount: 50,
    }),
  ];

  it("should total expenses", () => {
    expect(sum(expenses)).toBe(80);
  });
  it("should total by year", () => {
    expect(totalByYear(expenses, 2020)).toBe(30);
  });
  it("should total by expense type", () => {
    expect(totalByExpenseType(expenses, ExpenseType.Discretionary)).toBe(10);
  });
  it("should calculate net worth", () => {
    expect(netWorth(assets, debts)).toBe(2950);
  });
  it("should calculate liquid net worth", () => {
    expect(netWorthLiquid(assets)).toBe(1000);
  });
  it("should filter by props", () => {
    expect(
      filterBy(expenses, { k: "year", v: 2020 }, { k: "name", v: "groceries" })
    ).toEqual([expense02]);
  });
});
