export const formatNumber = (value: unknown, decimalPlaces = 2, options: Intl.NumberFormatOptions = {}) =>
  new Intl.NumberFormat('en-US', {
    maximumFractionDigits: decimalPlaces,
    ...options,
  }).format(+(value || 0));
