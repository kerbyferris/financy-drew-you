import { ExpenseType, MarketAssumptions } from "./types";

export const marketAssumptions: MarketAssumptions = {
  fiWithdrawalRate: 0.038,
  flexFiWithdrawalRate: 0.05,
  fatFiWithdrawalRate: 0.0333,
  inflationAdjustedGrowthRate: 0.07,
};

export const expenseCategories = {
  groceries: { name: "groceries", type: ExpenseType.NonDiscretionary },
  rent: { name: "rent", type: ExpenseType.NonDiscretionary },
  phone: { name: "phone", type: ExpenseType.NonDiscretionary },
  utilities: { name: "utilities", type: ExpenseType.NonDiscretionary },
  restaurants: { name: "restaurants", type: ExpenseType.Discretionary },
};
