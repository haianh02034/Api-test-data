import { shallowEqual } from 'react-redux';

export const isDeepEqual = (prevProps: any, nextProps: any): boolean => {
  if (prevProps === nextProps) {
    return true;
  }
  if (prevProps === null || nextProps === null) {
    return false;
  }

  const typePrev = typeof prevProps;
  const typeNext = typeof nextProps;
  if (typePrev !== typeNext) {
    return false;
  }

  if (typePrev === 'string' || typePrev === 'number') {
    return prevProps === nextProps;
  }

  if (typePrev === 'object') {
    if (Object.keys(prevProps)?.length !== Object.keys(nextProps)?.length) {
      return false;
    }

    if (shallowEqual(prevProps, nextProps)) {
      return true;
    }

    for (const key in prevProps) {
      try {
        if (!isDeepEqual(prevProps[key], nextProps[key])) {
          return false;
        }
      } catch (error) {
        return false;
      }
    }
  }
  return true;
};
