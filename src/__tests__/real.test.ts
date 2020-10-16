import { ynab } from "../repositories";
import { accessToken } from "../config";
import { filterByDateRange, partitionByAttribute } from "..";
import { pipe } from "fp-ts/lib/pipeable";
import * as E from "fp-ts/lib/Either";

describe("the real world", () => {
  // it("should get categories", async () => {
  //   const res = await systemUnderTest
  //     .getCategories()()
  //     .then((result) =>
  //       pipe(
  //         result,
  //         E.fold(
  //           (err) => {
  //             console.log(err);
  //             throw new Error(err.message);
  //           },
  //           (resp) => resp.data
  //         )
  //       )
  //     );
  //   console.log(res);
  // });
  it("should work in the real world", async () => {
    const start = new Date("2020-10-01");
    const end = new Date("2020-10-09");

    const systemUnderTest = ynab({ accessToken })();
    // const res = await systemUnderTest.getBudgets()();

    pipe(
      await systemUnderTest.getTransactions({ sinceDate: start })(),
      E.map(filterByDateRange({ start, end })),
      E.map(partitionByAttribute("category_name")),
      E.fold(
        (err) => {
          throw err;
        },
        (resp) => console.log(resp)
      )
    );
    // console.log(transactionsInRange);
    // const res = await systemUnderTest
    //   .getTransactions({ sinceDate: start })()
    //   .then(
    //     (result) =>
    //       pipe(
    //         result,
    //         E.fold(
    //           (err) => {
    //             throw new Error(err.message);
    //           },
    //           (resp) => {
    //             console.log(resp);
    //             calculateIncome({ start, end })(resp);
    //           }
    //         )
    //       ),
    //     (err) => console.log("something", err)
    //   );
    // console.log(res);
    // const res = await systemUnderTest.getCategories()();
    // console.log( await systemUnderTest.doSomething());
    // const res = await systemUnderTest.getTransactionsByCategory({
    //   categoryId: "7988de4f-13f8-41b9-9741-b8b1cd437aaf",
    //   sinceDate: "2020-1-1",
    // })();
    // const res = await systemUnderTest.getAccounts()();
  });
});
