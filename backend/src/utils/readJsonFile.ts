import fs from 'fs/promises';

export async function readJsonFile<T>(filePath: string): Promise<T> {
  const content = await fs.readFile(filePath, 'utf-8'); // Read file as string
  return JSON.parse(content); // Convert JSON string to JavaScript array
}
