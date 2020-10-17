import { Account as YnabAccount, TransactionSummary } from "ynab";
import * as O from "fp-ts/Option";
import * as A from "fp-ts/Array";
import * as E from "fp-ts/Either";
import { pipe } from "fp-ts/lib/pipeable";
import { identity } from "fp-ts/lib/function";
import { isWithinInterval } from "date-fns";

import { Account, AssetType, AccountType, LiabilityType, Asset } from "./types";
import { displayAmount } from "./helpers";

import { all } from "./helpers";
import { access } from "fs/promises";
import { keys } from "fp-ts/lib/ReadonlyRecord";
export const ynabAccountAdapter = ({
  type,
  name,
  balance,
}: YnabAccount): O.Option<Account> => {
  const account = { name, balance };
  switch (type) {
    case YnabAccount.TypeEnum.Cash:
      return O.some({
        ...account,
        type: { liquid: true, type: AssetType.Cash },
      });
    case YnabAccount.TypeEnum.Checking:
      return O.some({
        ...account,
        type: { liquid: true, type: AssetType.Checking },
      });
    case YnabAccount.TypeEnum.CreditCard:
      return O.some({
        ...account,
        type: { type: LiabilityType.CreditCard },
      });
    case YnabAccount.TypeEnum.InvestmentAccount:
      return O.some({
        ...account,
        type: { liquid: false, type: AssetType.Investment },
      });
    case YnabAccount.TypeEnum.LineOfCredit:
      return O.some({
        ...account,
        type: { type: LiabilityType.LineOfCredit },
      });
    case YnabAccount.TypeEnum.MerchantAccount:
      return O.some({
        ...account,
        type: { liquid: true, type: AssetType.Merchant },
      });
    case YnabAccount.TypeEnum.Mortgage:
      return O.some({
        ...account,
        type: { type: LiabilityType.Mortgage },
      });
    case YnabAccount.TypeEnum.OtherAsset:
      return O.some({
        ...account,
        type: { liquid: true, type: AssetType.Other },
      });
    case YnabAccount.TypeEnum.OtherLiability:
      return O.some({
        ...account,
        type: { type: LiabilityType.Other },
      });
    case YnabAccount.TypeEnum.PayPal:
      return O.some({
        ...account,
        type: { liquid: true, type: AssetType.PayPal },
      });
    case YnabAccount.TypeEnum.Savings:
      return O.some({
        ...account,
        type: { liquid: true, type: AssetType.Savings },
      });
    default:
      return O.none;
  }
};

export const ynabAccountsToAccounts = (
  ynabAccounts: YnabAccount[]
): O.Option<Account[]> => {
  return pipe(
    ynabAccounts,
    A.map(ynabAccountAdapter),
    A.filter(O.isSome),
    A.sequence(O.option)
  );
};

export const isAssetType = (type: AccountType) => type.type in AssetType;
export const isAssetAccount = ({ type }: Account): boolean => isAssetType(type);

export const calculateNetWorth = (accounts: Account[]): number => {
  return pipe(
    accounts,
    A.reduce(0, (acc, account) =>
      isAssetAccount(account) ? acc + account.balance : acc - account.balance
    )
  );
};

export const calculateLiquidAssets = (accounts: Account[]): number => {
  return pipe(
    accounts,
    A.filter(isAssetAccount),
    A.filter(({ type }) => (type as Asset).liquid),
    A.reduce(0, (acc, { balance }) => acc + balance)
  );
};

export interface DateRange {
  start: Date;
  end: Date;
}

export const isInDateRange = ({ start, end }: DateRange) => (
  date: string
): E.Either<Error, boolean> => {
  return E.tryCatch(
    () => isWithinInterval(new Date(date), { start, end }),
    E.toError
  );
};

export const sumTransactions = (transactions: TransactionSummary[]) => {
  return pipe(
    transactions,
    A.reduce(0, (acc, { amount }) => acc + amount)
  );
};

export const filterByDateRange = (dateRange: DateRange) => (
  transactions: TransactionSummary[]
) => {
  return pipe(
    transactions,
    A.filter(({ date }) => {
      return pipe(
        isInDateRange(dateRange)(date),
        E.fold((err) => {
          throw err;
        }, identity)
      );
    })
  );
};

interface TransactionsByCategory {
  [categoryName: string]: TransactionSummary[];
}

export const partitionByAttribute = (attr: string) => (
  transactions: any[]
): TransactionsByCategory => {
  return pipe(
    transactions,
    A.reduce({} as any, (acc, t) => {
      const attrValue = t[attr];
      if (attrValue) {
        console.log(attrValue);
        const existing = acc[attrValue] ? acc[attrValue] : [];
        console.log(existing);
        return { ...acc, [t[attr]]: [...existing, t] };
      } else {
        return acc;
      }
    })
  );
};

export const transactionTotalsByCategory = (
  transactionsByCategory: TransactionsByCategory
) => {
  return pipe(
    keys(transactionsByCategory) as string[],
    A.map((k) => ({ [k]: sumTransactions(transactionsByCategory[k]) })),
    A.reduce({} as any, (acc, o) => ({ ...acc, ...o }))
  );
};
