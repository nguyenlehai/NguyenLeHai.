export const formatNumber = (val: number, decimals = 6): number => {
  return Number(val.toFixed(decimals))
}

export const formatCurrency = (val: number, decimals = 6): string => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(val)
}
