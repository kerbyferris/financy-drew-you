module Components exposing (..)

import Data exposing (..)
import Html exposing (Html, div, h2, li, p, text, ul)
import Html.Attributes exposing (id)
import List exposing (filter, map, member, sum)



-- NET WORTH


isLiquid : Account -> Bool
isLiquid account =
    case account.accountType of
        Cash ->
            True

        Credit ->
            True

        Taxable ->
            True

        TaxFreeWithdrawable ->
            True

        _ ->
            False


getNetWorth : Model -> NetWorth
getNetWorth model =
    let
        liquidAccounts =
            filter isLiquid model.accounts

        illiquidAccounts =
            filter (\account -> not (isLiquid account)) model.accounts
    in
    { liquid = sum (map .balance liquidAccounts)
    , illiquid = sum (map .balance illiquidAccounts)
    }


viewNetWorth : Model -> Html msg
viewNetWorth model =
    div [ id "net-worth" ]
        [ h2 [] [ text "Net Worth" ]
        , ul []
            [ li [] [ text ("Liquid: $" ++ String.fromInt (getNetWorth model).liquid) ]
            , li [] [ text ("Illiquid: $" ++ String.fromInt (getNetWorth model).illiquid) ]
            ]
        ]



-- ACCOUNTS


viewAccounts : Model -> Html msg
viewAccounts model =
    div [ id "accounts" ]
        [ h2 [] [ text "Accounts" ]
        , ul []
            (map
                (\x -> li [] [ text (x.name ++ ": $" ++ String.fromInt x.balance) ])
                model.accounts
            )
        ]



-- EXPENSES


getSpendByCategory : List SpendData -> String -> Int
getSpendByCategory spendData category =
    let
        data =
            List.filter (\x -> x.category.name == category) spendData
    in
    sum (List.map .amount data)


viewExpenseTotals : Model -> Html msg
viewExpenseTotals model =
    div [ id "expenses" ]
        [ h2 [] [ text "Expense Totals" ]
        , ul []
            (map
                (\sc -> li [] [ text (sc.name ++ ": $" ++ String.fromInt (getSpendByCategory model.actualSpendData sc.name)) ])
                model.spendCategories
            )
        ]



-- INCOME


viewIncomeTotals : Model -> Html msg
viewIncomeTotals model =
    div [ id "income" ]
        [ h2 [] [ text "Income Totals" ]
        , ul []
            (map
                (\x -> li [] [ text (x.category.name ++ ": $" ++ String.fromInt x.amount) ])
                model.actualIncomeData
            )
        ]
