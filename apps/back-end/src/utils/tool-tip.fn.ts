import { TOOLTIP_ID } from './constant';

export const tooltip = (title: string): Record<string, unknown> => {
  if (!title?.length) {
    return {};
  }

  return {
    'data-tooltip-id': TOOLTIP_ID,
    'data-tooltip-content': title,
  };
};
