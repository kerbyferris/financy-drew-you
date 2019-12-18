module Data exposing (..)


type alias Model =
    { id : String
    , accounts : List Account
    , newAccountName : String
    , newAccountBalance : String
    , monthlyExpenses : List MonthlyExpense
    , monthlyIncome : List MonthlyIncome
    }


type AccountType
    = Cash
    | Credit
    | Taxable
    | TaxFreeWithdrawable
    | TaxDeferred
    | TaxFree
    | Mortgage
    | HomeEquity


type Liquidity
    = Liquid
    | Illiquid


type alias NetWorth =
    { liquid : Int
    , illiquid : Int
    }


type alias Account =
    { name : String
    , accountType : AccountType
    , balance : Int
    }


type ExpenseType
    = Necessary
    | Discretionary


type alias MonthlyExpense =
    { category : String
    , amount : Int
    , expenseType : ExpenseType
    }


type IncomeType
    = Salary
    | Supplemental


type alias MonthlyIncome =
    { category : String
    , amount : Int
    , incomeType : IncomeType
    }


type alias StrategicAssumptions =
    { withdrawalRate : Float
    , growthRate : Float
    }
