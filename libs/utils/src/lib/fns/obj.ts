export const objFilters = (
  objs: Record<string | number, unknown>,
  filter?: ([key, val]: unknown[]) => boolean | unknown
) => {
  if (typeof filter === 'function') {
    return Object.entries(objs)
      .filter(filter)
      .reduce((obj, [field, value]) => {
        return { ...obj, [field]: value };
      }, {});
  }

  return Object.entries(objs)
    .filter(([, value]) => {
      const _value = value?.toString()?.trim() || value;
      if (filter === undefined) {
        return !(value === null || value === undefined || _value === '');
      }
      return filter == _value;
    })
    .reduce((obj, [field, value]) => {
      return { ...obj, [field]: value };
    }, {});
};
