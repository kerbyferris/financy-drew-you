module Main exposing (..)

import Browser
import Components exposing (viewMonthlyExpenses, viewMonthlyIncome, viewNetWorth)
import Data exposing (..)
import Html exposing (..)
import Html.Attributes exposing (class, disabled, id, placeholder, type_, value)
import Html.Events exposing (onClick, onInput, onSubmit)
import List exposing (filter, map)
import Maybe exposing (withDefault)
import TestData exposing (..)


initialModel : Model
initialModel =
    { id = "Financy Drew"
    , newAccountName = ""
    , newAccountBalance = ""
    , accounts = []
    , monthlyIncome = []
    , monthlyExpenses = []
    }


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text model.id ]
        , viewAccounts model
        , Html.form [ class "new-account", onSubmit SubmitNewAccount ]
            [ input
                [ type_ "text"
                , placeholder "Account Name"
                , value model.newAccountName
                , onInput SetNewAccountName
                ]
                []
            , input
                [ type_ "text"
                , placeholder "Account Balance"
                , value model.newAccountBalance
                , onInput SetNewAccountBalance
                ]
                []
            , button [ disabled (String.isEmpty model.newAccountBalance) ] [ text "save" ]
            ]
        , viewNetWorth model
        , viewMonthlyIncome model
        , viewMonthlyExpenses model
        ]



-- ACCOUNTS


viewAccounts : Model -> Html Msg
viewAccounts model =
    div [ id "accounts" ]
        [ h2 [] [ text "Accounts" ]
        , ul [] (List.map viewAccount model.accounts)
        ]


viewAccount : Account -> Html Msg
viewAccount account =
    li []
        [ text (account.name ++ ": $" ++ String.fromInt account.balance)
        , span [ onClick (DeleteAccount account.name) ] [ text "[x]" ]
        ]


type Msg
    = SetNewAccountName String
    | SetNewAccountBalance String
      -- | UpdateAccountBalance Account
    | DeleteAccount String
    | SubmitNewAccount


update : Msg -> Model -> Model
update msg model =
    case msg of
        SetNewAccountName name ->
            { model | newAccountName = name }

        SetNewAccountBalance balance ->
            { model | newAccountBalance = balance }

        -- UpdateAccountBalance account balance ->
        --     let
        --         accounts =
        --             map
        --                 (\a ->
        --                     if a.name /= account.name then
        --                         account
        --                     else
        --                         { a | balance = balance }
        --                 )
        --                 model.accounts
        --     in
        --     { model | accounts = accounts }
        DeleteAccount name ->
            let
                accounts =
                    filter (\x -> x.name /= name) model.accounts
            in
            { model | accounts = accounts }

        SubmitNewAccount ->
            let
                newAccount =
                    { name = model.newAccountName
                    , balance = withDefault 0 (String.toInt model.newAccountBalance)
                    , accountType = Cash
                    }
            in
            { model
                | accounts = model.accounts ++ [ newAccount ]
            }


main : Program () Model Msg
main =
    Browser.sandbox
        { init = testModel
        , view = view
        , update = update
        }


accountStringToAccountType : String -> Maybe AccountType
accountStringToAccountType accountString =
    case accountString of
        "cash" ->
            Just Cash

        "credit" ->
            Just Credit

        "taxable" ->
            Just Taxable

        "tax free withdrawable" ->
            Just TaxFreeWithdrawable

        "tax deferred" ->
            Just TaxDeferred

        "tax free" ->
            Just TaxFree

        "mortgage" ->
            Just Mortgage

        "home equity" ->
            Just HomeEquity

        _ ->
            Nothing
