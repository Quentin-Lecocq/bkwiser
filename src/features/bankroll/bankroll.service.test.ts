import { expect, describe, it } from 'vitest';
import { isWithdrawalValid } from './bankroll.service';

describe('isWithdrawalValid', () => {
  it('should return true when withdrawal is valid', () => {
    const current = 100;
    const withdrawal = 50;
    expect(isWithdrawalValid(current, withdrawal)).toBe(true);
  });
  it('should return false when withdrawal is greater than current bankroll', () => {
    const current = 100;
    const withdrawal = 150;
    expect(isWithdrawalValid(current, withdrawal)).toBe(false);
  });
  it('should return false when withdrawal is less than or equal to 0', () => {
    const current = 100;
    const withdrawal = -50;
    expect(isWithdrawalValid(current, withdrawal)).toBe(false);
  });
});
