export function formatPhoneNumber(value: string): string {
  // Remove all non-numeric characters
  const number = value.replace(/[^\d]/g, "");

  // Format with hyphens
  if (number.length <= 3) {
    return number;
  } else if (number.length <= 7) {
    return `${number.slice(0, 3)}-${number.slice(3)}`;
  } else {
    return `${number.slice(0, 3)}-${number.slice(3, 7)}-${number.slice(7, 11)}`;
  }
}

export function stripPhoneNumber(value: string): string {
  return value.replace(/[^\d]/g, "");
}
