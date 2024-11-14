export type DeferObj<T> = {
  resolve: CallableFunction;
  reject: CallableFunction;
  promise: Promise<T>;
};
export const Defer = <T>(): DeferObj<T> => {
  const result: Record<string, any> = {};
  result['promise'] = new Promise((resolve, reject) => {
    result['resolve'] = resolve;
    result['reject'] = reject;
  });
  return result as {
    resolve: CallableFunction;
    reject: CallableFunction;
    promise: Promise<T>;
  };
};
