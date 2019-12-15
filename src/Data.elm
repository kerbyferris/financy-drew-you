module Data exposing (..)


type alias UserData =
    { id : String
    , accounts : List Account
    , spendCategories : List SpendCategory
    , actualSpendData : List SpendData
    , speculativeSpendData : List SpendData
    , actualIncomeData : List SpendData
    , speculativeIncomeData : List SpendData
    }


type AccountType
    = Cash
    | Credit
    | Taxable
    | TaxDeferred
    | TaxFree
    | TaxFreeWithdrawable
    | Mortgage


type alias RealEstate =
    { currentValue : Int
    , outstanding : Int
    }


type alias Account =
    { name : String
    , accountType : AccountType
    , balance : Int
    }


type SpendType
    = Necessary
    | Discretionary


type alias SpendData =
    { yearMonth : Int
    , amount : Int
    , category : SpendCategory
    }


type alias SpendCategory =
    { name : String
    , spendType : SpendType
    }


type IncomeType
    = Salary
    | Supplemental


type alias IncomeData =
    { yearMonth : Int
    , amount : Int
    , category : IncomeCategory
    }


type alias IncomeCategory =
    { name : String
    , incomeType : IncomeType
    }


type alias StrategicAssumptions =
    { withdrawalRate : Float
    , growthRate : Float
    }


type alias CategorySpendReport =
    { category : SpendCategory
    , averageMonthlySpend : Int
    , dailyFromAverage : Int
    , yearlyFromAverage : Int
    , savingsRequired : Int
    , monthsRequired : Int
    }


type alias NetWorth =
    { liquidAmount : Int
    , illiquidAmmount : Int
    }
