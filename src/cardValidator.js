export function isValidCardNumber(number) {
  const digits = number.replace(/\D/g, '').split('').reverse().map(Number);
  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let digit = digits[i];
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
  }

  // Минимальная длина карты — 13, максимум — 19
  if (digits.length < 13 || digits.length > 19) return false;

  return sum % 10 === 0;
}

export function getCardType(number) {
  const sanitized = number.replace(/\D/g, '');
  if (/^4\d{12}(\d{3})?$/.test(sanitized)) {
    return 'Visa';
  } else if (/^5[1-5]\d{14}$/.test(sanitized)) {
    return 'MasterCard';
  } else if (/^3[47]\d{13}$/.test(sanitized)) {
    return 'American Express';
  } else if (/^6(?:011|5\d{2})\d{12}$/.test(sanitized)) {
    return 'Discover';
  } else if (/^220[0-4]/.test(sanitized)) {
    return 'Мир';
  }
  return 'Unknown';
}