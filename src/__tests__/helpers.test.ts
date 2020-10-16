import { all } from "../helpers";

describe("helpers", () => {
  describe("all", () => {
    it("should return true when all are true", () => {
      expect(all([true, true, true])).toBe(true);
    });
    it("should return false when some are false", () => {
      expect(all([true, false])).toBe(false);
    });
    it("should return false when all are false", () => {
      expect(all([false, false])).toBe(false);
    });
    it("should return true on empty", () => {
      expect(all([])).toBe(true);
    });
  });
});
