export const timestamp = (time?: number | string | Date): number => {
  if (time instanceof Date) {
    return Math.floor(time.getTime() / 1000);
  }

  const date = time ? new Date(time) : new Date();
  return Math.floor(date.getTime() / 1000);
};

export const date = (time?: number | string | Date): Date | undefined => {
  if (!time) {
    return;
  }
  if (time instanceof Date) {
    return time;
  }

  if (isNaN(Number(time))) {
    return new Date(time);
  }

  return new Date(+time * 1000);
};

export const addDays = (date: Date, addDays: number): Date => {
  const clone = new Date(date);
  clone.setDate(date.getDate() + addDays);
  return clone;
};
