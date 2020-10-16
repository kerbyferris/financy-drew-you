import { mock } from "jest-mock-extended";
import { calculateNetWorth } from "..";
import { Account, LiabilityType, AssetType } from "../types";

describe("ynab repository", () => {
  it.only("should calculate net worth", () => {
    const account1 = mock<Account>({
      balance: 100,
      type: { type: AssetType.Checking },
    });
    const account2 = mock<Account>({
      balance: 5,
      type: { type: LiabilityType.CreditCard },
    });
    const account3 = mock<Account>({
      balance: 2,
      type: { type: AssetType.Cash },
    });
    const res = calculateNetWorth([account1, account2, account3]);
    expect(res).toBe(97);
  });
});
