export const arrayUnique = <T = string | number>(arr: T[]): T[] => [...new Set(arr)];

export const arrayToBatchs = <T>(arr: T[], length = 100): T[][] => {
  const output = [];
  while (arr?.length) {
    output.push(arr.splice(0, length));
  }
  return output;
};
