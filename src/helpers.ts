export const all = (xs: boolean[]) => xs.reduce((acc, x) => acc && x, true);

export const displayAmount = (amount: number) => amount / 1000;
