import * as xlsx from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';

type ConvertFileFn = (filename: string) => void;
type MainFn = () => void;

const sourceDir = path.join(__dirname, '..', 'excels');
const outputDir = path.join(__dirname, '..', 'data');

const convertFile: ConvertFileFn = (filename) => {
  const workbook = xlsx.readFile(path.join(sourceDir, filename));
  const sheetName = workbook.SheetNames[0];
 const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName], {
   cellDates: true,
 // eslint-disable-next-line @typescript-eslint/no-explicit-any
 } as any);

  const outputFile = filename.replace('.xlsx', '.json');
  fs.writeFileSync(path.join(outputDir, outputFile), JSON.stringify(data, null, 2));
  console.log(`Converted ${filename} → ${outputFile}`);
};

const main: MainFn = () => {
  if (!fs.existsSync(sourceDir)) {
    console.error(`Source directory not found: ${sourceDir}`);
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(sourceDir).filter((file) => file.endsWith('.xlsx'));

  if (files.length === 0) {
    console.warn('No .xlsx files found in source directory.');
    return;
  }

  files.forEach(convertFile);
};

main();

//* To run the script npx ts-node src/scripts/convertExcel.ts


/**
** Note: Datetime Handling for Excel Conversion

** Only `courses.xlsx` uses **real Excel datetime format** (serialized numbers, e.g., 45461.6410)
- Use `excelDateToJSDate()` to convert to JavaScript Date objects.

** All other Excel files (`users.xlsx`, `entries.xlsx`, etc.) store datetime as **text strings**
- Format is: "YYYY-MM-DD HH:mm:ss" (SQL datetime format)
- No conversion needed unless parsing or comparing dates in code.

** Example conversion (only for courses):
const jsDate = excelDateToJSDate(course.course_created_at);
*/