import {
  API as YnabClient,
  BudgetSummary,
  TransactionSummary,
  Category,
  Account,
} from "ynab";
import * as TE from "fp-ts/lib/TaskEither";

export interface YnabConfig {
  accessToken: string;
  endpointUrl?: string;
  budgetId?: string;
}

export interface YnabRepository {
  getBudgets(): TE.TaskEither<Error, BudgetSummary[]>;
  getTransactions(
    params?: GetTransactionsParams
  ): TE.TaskEither<Error, TransactionSummary[]>;
  getTransactionsByCategory(
    params: GetTransactionsByCategoryParams
  ): TE.TaskEither<Error, TransactionSummary[]>;
  getCategories(): TE.TaskEither<Error, Category[]>;
  getCategories(): TE.TaskEither<Error, any>;
  getAccounts(): TE.TaskEither<Error, Account[]>;
  doSomething(params?: any): any;
}

export interface GetTransactionsParams {
  budgetId?: string;
  sinceDate?: string | Date;
  type?: "uncategorized" | "unapproved" | undefined;
  lastKnowledgeOfServer?: number;
}

export interface GetTransactionsByCategoryParams extends GetTransactionsParams {
  categoryId: string;
}

export const ynab = (config: YnabConfig) => (
  client?: YnabClient
): YnabRepository => {
  const ynabClient =
    client || new YnabClient(config.accessToken, config.endpointUrl);
  const budgetId = config?.budgetId ? config.budgetId : "last-used";

  return {
    getBudgets: () =>
      TE.tryCatch(
        () =>
          ynabClient.budgets.getBudgets().then((result) => result.data.budgets),
        (reason) => reason as Error
      ),
    getTransactions: (params) => {
      return TE.tryCatch(
        () =>
          ynabClient.transactions
            .getTransactions(
              budgetId,
              params?.sinceDate,
              params?.type,
              params?.lastKnowledgeOfServer
            )
            .then((result) => result.data.transactions),
        (reason) => reason as Error
      );
    },
    getTransactionsByCategory: (params) => {
      return TE.tryCatch(
        () =>
          ynabClient.transactions
            .getTransactionsByCategory(
              budgetId,
              params.categoryId,
              params?.sinceDate,
              params?.type,
              params?.lastKnowledgeOfServer
            )
            .then((result) => result.data.transactions),
        (reason) => reason as Error
      );
    },
    getCategories: () =>
      TE.tryCatch(
        () =>
          ynabClient.categories
            .getCategories(budgetId)
            .then((result) =>
              result.data.category_groups.flatMap((c) => c.categories)
            ),
        (reason) => reason as Error
      ),
    getAccounts: () =>
      TE.tryCatch(
        () =>
          ynabClient.accounts
            .getAccounts(budgetId)
            .then((result) => result.data.accounts),
        (reason) => reason as Error
      ),
    doSomething: async () => {
      const catId = "e234aee5-090e-4c40-b772-867c41eb78c4";
      const cats = (await ynabClient.categories.getCategories("last-used")).data
        .category_groups;
      console.log(cats.map((c) => c.categories));

      console.log(
        await ynabClient.categories.getCategoryById("last-used", catId)
      );
      return ynabClient.transactions.getTransactionsByCategory(
        "last-used",
        catId
      );
    },
  };
};
