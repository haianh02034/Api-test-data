export const formatCurrency = (value: unknown, decimalPlaces = 2, options: Intl.NumberFormatOptions = {}) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: decimalPlaces,
    ...options,
  }).format(+(value || 0));
