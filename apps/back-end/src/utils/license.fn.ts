import { LICENSE_STATES, LICENSE_STATUS } from '.';

export const licenseStateClass = (state: number, prefix = 'bg-gradient-'): string => {
  switch (state) {
    case LICENSE_STATES.NEW:
      return `${prefix}info`;
    case LICENSE_STATES.ACTIVATED:
      return `${prefix}success`;
    case LICENSE_STATES.EXPIRED:
      return `${prefix}warning`;
    case LICENSE_STATES.CANCELED:
      return `${prefix}secondary`;
    default:
      return `${prefix}danger`;
  }
};

export const licenseStatusClass = (status: number, prefix = 'bg-gradient-'): string => {
  switch (status) {
    case LICENSE_STATUS.NEW:
      return `${prefix}success`;
    case LICENSE_STATUS.USING:
      return `${prefix}info`;
    case LICENSE_STATUS.EXPIRED:
      return `${prefix}warning`;
    case LICENSE_STATUS.CANCELED:
      return `${prefix}secondary`;
    default:
      return `${prefix}danger`;
  }
};
