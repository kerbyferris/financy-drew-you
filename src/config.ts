require("dotenv").config();

import { MarketAssumptions } from "./types";

export const accessToken = process.env.ACCESS_TOKEN as string;

export const marketAssumptions: MarketAssumptions = {
  fiWithdrawalRate: 0.038,
  flexFiWithdrawalRate: 0.05,
  fatFiWithdrawalRate: 0.0333,
  inflationAdjustedGrowthRate: 0.07,
};
