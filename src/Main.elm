module Main exposing (..)

import Browser
import Components exposing (viewAccounts, viewExpenseTotals, viewIncomeTotals, viewNetWorth)
import Data exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)
import List exposing (sum)
import TestData exposing (..)


initialModel : Model
initialModel =
    { id = "Financy Drew"
    , accounts = []
    , spendCategories = []
    , actualSpendData = []
    , speculativeSpendData = []
    , actualIncomeData = []
    , speculativeIncomeData = []
    }


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text model.id ]
        , viewAccounts model
        , viewNetWorth model
        , viewExpenseTotals model
        , viewIncomeTotals model
        ]


type Msg
    = SetName


update : Msg -> Model -> Model
update msg model =
    case msg of
        SetName ->
            { model | id = "New Name" }


main : Program () Model Msg
main =
    Browser.sandbox
        { init = testModel
        , view = view
        , update = update
        }
