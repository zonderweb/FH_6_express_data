export const formatValue = (value) => {
  if (value === null || value === undefined || value === '') return '-';

  const num = Number(value);
  if (!Number.isNaN(num) && Number.isFinite(num)) {
    return new Intl.NumberFormat('de-DE').format(num);
  }

  return value;
};
