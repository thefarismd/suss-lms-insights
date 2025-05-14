export function parseNA(value: string): string | null {
  return value === 'NA' ? null : value;
}
