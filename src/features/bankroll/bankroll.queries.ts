export const bankrollKeys = {
  all: ['bankroll'] as const,
  balance: () => [...bankrollKeys.all, 'balance'] as const,
};
