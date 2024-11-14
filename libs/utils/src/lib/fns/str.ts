import { arrayUnique } from './array';

export const listIds = (listIds: string): number[] => arrayUnique(listIds?.split(/\s*[,;]+\s*/g)?.map((num) => +num));

export const strRand = (length = 16): string => {
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return Array.apply(null, Array(length))
    .map(() => chars.charAt(Math.floor(Math.random() * chars.length)))
    .join('');
};

export const strProtect = (str: string) => {
  if (!str) {
    return '';
  }
  const chars = str.split('').map((char, index) => {
    if (index <= 2 || index + 3 >= str.length) {
      return char;
    }
    return '*';
  });

  return chars.join('').replace(/\*{1,}/g, '***');
};
