module Components exposing (..)

import Data exposing (..)
import Html exposing (Html, div, h2, li, text, ul)
import Html.Attributes exposing (id)
import List exposing (filter, map, sum)



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



-- EXPENSES


viewMonthlyExpenses : Model -> Html msg
viewMonthlyExpenses model =
    div [ id "expenses" ]
        [ h2 [] [ text "Expense Totals" ]
        , ul []
            (map
                (\m -> li [] [ text (m.category ++ ": $" ++ String.fromInt m.amount) ])
                model.monthlyExpenses
            )
        ]



-- INCOME


viewMonthlyIncome : Model -> Html msg
viewMonthlyIncome model =
    div [ id "income" ]
        [ h2 [] [ text "Income Totals" ]
        , ul []
            (map
                (\x -> li [] [ text (x.category ++ ": $" ++ String.fromInt x.amount) ])
                model.monthlyIncome
            )
        ]
