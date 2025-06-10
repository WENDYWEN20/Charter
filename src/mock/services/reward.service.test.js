import { describe, expect, test } from "vitest";
import { calculateReward } from "./reward.service";

describe("Reward Service", () => {
  test('returns 0 for amounts less than or equal to 50', () => {
    expect(calculateReward(0)).toBe(0);
    expect(calculateReward(50)).toBe(0);
    expect(calculateReward(25)).toBe(0);
  });

  test('returns amount - 50 for amounts between 50 and 100', () => {
    expect(calculateReward(51)).toBe(1);
    expect(calculateReward(75)).toBe(25);
    expect(calculateReward(100)).toBe(50);
  });

  test('returns (amount - 100) * 2 + 50 for amounts greater than 100', () => {
    expect(calculateReward(101)).toBe(52);
    expect(calculateReward(150)).toBe(150);
    expect(calculateReward(200)).toBe(250);
  });

});