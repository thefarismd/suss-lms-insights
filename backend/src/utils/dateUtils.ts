export function excelSerialToISOString(serial: number): string {
  const excelEpoch = new Date(1899, 11, 30); // Excel epoch
  const ms = serial * 86400000;
  return new Date(excelEpoch.getTime() + ms).toISOString();
}

export function sqlDatetimeToISOString(value: string): string {
  return new Date(value).toISOString();
}