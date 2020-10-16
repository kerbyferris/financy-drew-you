import {
  Asset,
  Debt,
  AssetType,
  MonthlyRecord,
  ExpenseType,
  Totallable,
} from "./types";
import { filter, map, reduce } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/function";

export const filterBy = <T>(coll: T[], ...props: { k: keyof T; v: any }[]) => {
  return pipe(
    props,
    reduce(coll, (acc, { k, v }) => {
      return pipe(
        acc,
        filter((a) => a[k] === v)
      );
    })
  );
};

export const sum = (collection: Totallable[]): number =>
  pipe(
    collection,
    map((c) => c.amount),
    reduce(0, (acc, a) => acc + a)
  );

export const objKeyHasValue = <T>(obj: T, k: keyof T, v: any): boolean =>
  obj[k] === v;

export const totalByYear = (
  collection: MonthlyRecord[],
  year: number
): number =>
  pipe(
    collection,
    filter((c) => objKeyHasValue(c, "year", year)),
    sum
  );

export const totalByExpenseType = (
  collection: MonthlyRecord[],
  expenseType: ExpenseType
): number =>
  pipe(
    collection,
    filter((c) => objKeyHasValue(c, "type", expenseType)),
    sum
  );

export const netWorth = (assets: Asset[], debts: Debt[]): number =>
  sum(assets) - sum(debts);

export const netWorthLiquid = (assets: Asset[]): number =>
  pipe(
    assets,
    filter((c) => objKeyHasValue(c, "assetType", AssetType.Liquid)),
    sum
  );
