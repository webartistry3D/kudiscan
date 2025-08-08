export function formatNaira(amount: number | string): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) return '₦0.00';
  
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'symbol'
  }).format(numericAmount).replace('NGN', '₦');
}

export function parseAmount(value: string): number {
  // Remove currency symbols and commas, then parse
  const cleaned = value.replace(/[₦,\s]/g, '');
  return parseFloat(cleaned) || 0;
}
