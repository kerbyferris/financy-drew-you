module Main exposing (..)

import Browser
import Data exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import List exposing (sum)
import TestData exposing (..)


getNetWorth : UserData -> Int
getNetWorth data =
    sum (List.map (\account -> account.balance) data.accounts)


netWorth =
    getNetWorth data


getSpendByCategory : List SpendData -> String -> Int
getSpendByCategory spendData category =
    let
        foo =
            List.filter (\x -> x.category.name == category) spendData
    in
    sum (List.map (\x -> x.amount) foo)


main : Html msg
main =
    div []
        [ h1 [] [ text data.id ]
        , ul []
            (List.map
                (\x -> li [] [ text (x.name ++ ": " ++ String.fromInt x.balance) ])
                data.accounts
            )
        , p [] [ text ("Net Worth: " ++ String.fromInt netWorth) ]
        , ul []
            (List.map
                (\x -> li [] [ text (x.name ++ ": " ++ String.fromInt (getSpendByCategory data.actualSpendData x.name)) ])
                data.spendCategories
            )
        ]
