export function isWithdrawalValid(
  current: number,
  withdrawal: number,
): boolean {
  return withdrawal > 0 && withdrawal <= current;
}
