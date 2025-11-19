export const formatCurrency = (amount: number, currency: string = 'GBP'): string => {
  const symbols: Record<string, string> = {
    GBP: '£',
    USD: '$',
    EUR: '€',
  };
  
  const symbol = symbols[currency] || currency;
  return `${symbol}${amount.toLocaleString('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
};

export const formatCurrencyCompact = (amount: number, currency: string = 'GBP'): string => {
  if (amount >= 1000000) {
    return formatCurrency(amount / 1000000, currency) + 'M';
  }
  if (amount >= 1000) {
    return formatCurrency(amount / 1000, currency) + 'K';
  }
  return formatCurrency(amount, currency);
};


