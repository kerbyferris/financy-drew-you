import * as E from "fp-ts/lib/Either";
import { mock, mockDeep } from "jest-mock-extended";
import {
  API as YnabClient,
  AccountsResponse,
  Account,
  BudgetSummary,
  BudgetSummaryResponse,
  TransactionSummary,
  TransactionsResponse,
  HybridTransactionsResponse,
  CategoriesResponse,
  Category,
} from "ynab";

import { ynab, YnabConfig } from "../../repositories";

jest.mock("ynab");

describe("ynab repository", () => {
  const mockYnabClient = mockDeep<YnabClient>();
  const systemUnderTest = ynab({} as YnabConfig);
  describe("client configuration", () => {
    it("should create default client", () => {
      const repo = systemUnderTest();
      expect(repo).toHaveProperty("getBudgets");
    });
    it("should use client when passed", () => {
      const repo = systemUnderTest(mockYnabClient);
      expect(repo).toHaveProperty("getBudgets");
    });
  });

  describe("getBudgets", () => {
    const repo = systemUnderTest(mockYnabClient);
    it("should return right with ynab budgets", async () => {
      const budgets = [mock<BudgetSummary>()];
      const mockYnabResp = mock<BudgetSummaryResponse>({
        data: { budgets },
      });
      mockYnabClient.budgets.getBudgets.mockResolvedValue(mockYnabResp);
      const res = await repo.getBudgets()();
      expect(res).toStrictEqual(E.right(budgets));
    });

    it("should return left with ynab error", async () => {
      const mockYnabResp = Error("boom");
      mockYnabClient.budgets.getBudgets.mockRejectedValue(mockYnabResp);
      const res = await repo.getBudgets()();
      expect(res).toStrictEqual(E.left(mockYnabResp));
    });
  });

  describe("getTransactions", () => {
    const repo = systemUnderTest(mockYnabClient);
    it("should return right with ynab transactions", async () => {
      const transactions = [mock<TransactionSummary>()];
      const mockYnabResp = mock<TransactionsResponse>({
        data: { transactions },
      });
      mockYnabClient.transactions.getTransactions.mockResolvedValue(
        mockYnabResp
      );
      const res = await repo.getTransactions()();
      expect(res).toStrictEqual(E.right(transactions));
    });

    it("should return left with ynab error", async () => {
      const mockYnabResp = Error("boom");
      mockYnabClient.transactions.getTransactions.mockRejectedValue(
        mockYnabResp
      );

      const res = await repo.getTransactions()();
      expect(res).toStrictEqual(E.left(mockYnabResp));
    });
  });

  describe("getTransactionsByCategory", () => {
    const repo = systemUnderTest(mockYnabClient);
    it("should return right with ynab transactions", async () => {
      const transactions = [mock<TransactionSummary>()];
      const mockYnabResp = mock<HybridTransactionsResponse>({
        data: { transactions },
      });
      mockYnabClient.transactions.getTransactionsByCategory.mockResolvedValue(
        mockYnabResp
      );
      const res = await repo.getTransactionsByCategory(expect.any(String))();
      expect(res).toStrictEqual(E.right(transactions));
    });

    it("should return left with ynab error", async () => {
      const mockYnabResp = Error("boom");
      mockYnabClient.transactions.getTransactionsByCategory.mockRejectedValue(
        mockYnabResp
      );

      const res = await repo.getTransactionsByCategory(expect.any(String))();
      expect(res).toStrictEqual(E.left(mockYnabResp));
    });
  });

  describe("getCategories", () => {
    const repo = systemUnderTest(mockYnabClient);
    it("should return right with ynab categories", async () => {
      const categories = [mock<Category>()];
      const mockYnabResp = mock<CategoriesResponse>({
        data: {
          category_groups: [{ categories }],
        },
      });
      mockYnabClient.categories.getCategories.mockResolvedValue(mockYnabResp);
      const res = await repo.getCategories()();
      expect(res).toStrictEqual(E.right(categories));
    });

    it("should return left with ynab error", async () => {
      const mockYnabResp = Error("boom");
      mockYnabClient.categories.getCategories.mockRejectedValue(mockYnabResp);
      const res = await repo.getCategories()();
      expect(res).toStrictEqual(E.left(mockYnabResp));
    });
  });

  describe("getAccounts", () => {
    const repo = systemUnderTest(mockYnabClient);
    it("should return right with ynab accounts ", async () => {
      const accounts = [mock<Account>()];
      const mockYnabResp = mock<AccountsResponse>({
        data: { accounts },
      });
      mockYnabClient.accounts.getAccounts.mockResolvedValue(mockYnabResp);
      const res = await repo.getAccounts()();
      expect(res).toStrictEqual(E.right(accounts));
    });

    it("should return left with ynab error", async () => {
      const mockYnabResp = Error("boom");
      mockYnabClient.accounts.getAccounts.mockRejectedValue(mockYnabResp);
      const res = await repo.getAccounts()();
      expect(res).toStrictEqual(E.left(mockYnabResp));
    });
  });
});
