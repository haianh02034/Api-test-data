import { ISelectOptions } from '@react-libs/types';

export const enumToOptions = (enumData: Record<string, string | number>, prefix = ''): ISelectOptions[] => {
  return Object.entries(enumData)
    .filter(([, value]) => !isNaN(Number(value)))
    .map(([key, value]) => ({
      value,
      label: `${prefix}.${key}`,
    }));
};

export const enumLabel = (enumData: Record<string, string | number>, value: number, prefix = ''): string => {
  const options = enumToOptions(enumData, prefix);
  const option = options.find(({ value: val }) => val === value);
  return option?.label || 'unknown';
};
