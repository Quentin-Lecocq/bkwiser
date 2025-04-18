import { BetType, Outcome } from './bets.types';

export const outcomeOptions = ['won', 'lost', 'pending', 'void'] as const;

export const typeOptions = ['single', 'combo'] as const;

export function getDefaultBetType(): BetType {
  return typeOptions[0];
}

export function getDefaultBetOutcome(): Outcome {
  return outcomeOptions[2];
}
