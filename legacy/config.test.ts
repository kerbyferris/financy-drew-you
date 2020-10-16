import { marketAssumptions } from "../config";

describe("config", () => {
  it("should be configured", () => {
    expect(marketAssumptions).toBeDefined();
  });
});
