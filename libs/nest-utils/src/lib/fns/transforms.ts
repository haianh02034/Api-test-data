import { date } from '@utils';
import { Transform } from 'class-transformer';

export const TransformRangeDate = (field: string = '') => {
  return Transform(({ value, obj }) => {
    if (value) {
      return date(value);
    }

    const formDate = obj?.[`${field}fromDate`] || obj?.[`${field}_fromDate`] || obj?.[`${field}_from`];
    const toDate = obj?.[`${field}toDate`] || obj?.[`${field}_toDate`] || obj?.[`${field}_to`];

    if (formDate && toDate) {
      return ['>=<', [date(formDate), date(toDate)]];
    }

    if (formDate) {
      return ['>=', date(formDate)];
    }

    if (toDate) {
      return ['<=', date(toDate)];
    }

    return;
  });
};

export const TransformRange = (field?: string) => {
  return Transform(({ value, obj }) => {
    if (value) {
      return value;
    }

    const formVal = obj?.[`${field}from`] || obj?.[`${field}_from`];
    const toVal = obj?.[`${field}to`] || obj?.[`${field}_to`];

    if (formVal && toVal) {
      return ['>=<', [formVal, toVal]];
    }

    if (formVal) {
      return ['>=', formVal];
    }

    if (toVal) {
      return ['<=', toVal];
    }

    return;
  });
};

export const TransformLike = (
  operator: 'LIKE' | '%LIKE%' | '%LIKE' | 'LIKE%' | 'ILIKE' | '%ILIKE%' | '%ILIKE' | 'ILIKE%' = 'LIKE'
) => {
  return Transform(({ value }) => {
    if (value) {
      return [operator, value];
    }

    return;
  });
};

export const TransformBool = () => {
  return Transform(({ value }) => {
    if (typeof value === 'boolean') {
      return !!value;
    }

    if (!isNaN(+value)) {
      return !!+value;
    }
    return `${value}`.trim().toUpperCase() === 'TRUE';
  });
};
