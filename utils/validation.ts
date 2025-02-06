export function isGachonEmail(email: string): boolean {
  return email.endsWith("@gachon.ac.kr");
}

export function validatePassword(password: string): boolean {
  return password.length >= 8;
}
