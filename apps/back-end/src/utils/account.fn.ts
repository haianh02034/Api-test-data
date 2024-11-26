import { ACCOUNT_STATUSES } from '.';

export const accountStatusClass = (status: number, prefix = 'bg-gradient-'): string => {
  switch (status) {
    case ACCOUNT_STATUSES.ACTIVE:
      return `${prefix}info`;
    case ACCOUNT_STATUSES.INACTIVE:
      return `${prefix}secondary`;
    default:
      return `${prefix}danger`;
  }
};
