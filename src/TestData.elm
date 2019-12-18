module TestData exposing (..)

import Data exposing (..)


accounts : List Account
accounts =
    [ { name = "Credit Union", accountType = Cash, balance = 4000 }
    , { name = "Savings", accountType = TaxDeferred, balance = 3000 }
    , { name = "Roth IRA", accountType = TaxDeferred, balance = 4000 }
    ]


monthlyExpenses : List MonthlyExpense
monthlyExpenses =
    [ { category = "Groceries", expenseType = Necessary, amount = 430 }
    , { category = "Rent", expenseType = Necessary, amount = 3000 }
    , { category = "Restaurants", expenseType = Discretionary, amount = 300 }
    ]


monthlyIncome : List MonthlyIncome
monthlyIncome =
    [ { category = "Salary", incomeType = Salary, amount = 430 }
    , { category = "Selling Things", incomeType = Supplemental, amount = 3000 }
    ]


testModel : Model
testModel =
    { id = "Financy Drew"
    , newAccountName = ""
    , newAccountBalance = ""
    , accounts = accounts
    , monthlyExpenses = monthlyExpenses
    , monthlyIncome = monthlyIncome
    }
