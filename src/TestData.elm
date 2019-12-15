module TestData exposing (..)

import Data exposing (..)


accounts : List Account
accounts =
    [ { name = "Credit Union", accountType = Cash, balance = 4000 }
    , { name = "Roth IRA", accountType = TaxDeferred, balance = 4000 }
    ]


groceries : SpendCategory
groceries =
    { name = "Groceries", spendType = Necessary }


rent : SpendCategory
rent =
    { name = "Rent", spendType = Necessary }


restaurants : SpendCategory
restaurants =
    { name = "Restaurants", spendType = Discretionary }


spendCategories : List SpendCategory
spendCategories =
    [ groceries
    , { name = "Rent", spendType = Necessary }
    , { name = "Restaurants", spendType = Discretionary }
    ]


actualSpendData : List SpendData
actualSpendData =
    [ { yearMonth = 201912, amount = 430, category = groceries }
    , { yearMonth = 201911, amount = 250, category = groceries }
    , { yearMonth = 201912, amount = 3000, category = rent }
    , { yearMonth = 201912, amount = 300, category = restaurants }
    ]


salary : IncomeCategory
salary =
    { name = "Salary", incomeType = Salary }


sale : IncomeCategory
sale =
    { name = "Sold Something", incomeType = Supplemental }


actualIncomeData : List IncomeData
actualIncomeData =
    [ { yearMonth = 201912, amount = 4000, category = salary }
    , { yearMonth = 201911, amount = 2000, category = sale }
    ]


data : UserData
data =
    { id = "Financy Drew"
    , accounts = accounts
    , spendCategories = spendCategories
    , actualSpendData = actualSpendData
    , speculativeSpendData = []
    , actualIncomeData = []
    , speculativeIncomeData = []
    }
