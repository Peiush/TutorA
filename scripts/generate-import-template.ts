import ExcelJS from "exceljs";
import { courseCategories, courseLevels } from "@/lib/mock-courses";

const CATEGORIES = courseCategories;
const LEVELS = courseLevels;
const YES_NO = ["Yes", "No"];
const TEACHER_STATUS = ["Approved", "Pending", "Rejected"];

const HEADER_FILL: ExcelJS.Fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF223D66" } };
const HEADER_FONT: Partial<ExcelJS.Font> = { color: { argb: "FFFFFFFF" }, bold: true };

function styleHeader(sheet: ExcelJS.Worksheet) {
  const row = sheet.getRow(1);
  row.eachCell((cell) => {
    cell.fill = HEADER_FILL;
    cell.font = HEADER_FONT;
    cell.alignment = { vertical: "middle" };
  });
  row.height = 22;
  sheet.views = [{ state: "frozen", ySplit: 1 }];
}

function addListValidation(sheet: ExcelJS.Worksheet, column: string, options: string[], lastRow = 500) {
  for (let r = 2; r <= lastRow; r++) {
    sheet.getCell(`${column}${r}`).dataValidation = {
      type: "list",
      allowBlank: true,
      formulae: [`"${options.join(",")}"`],
      showErrorMessage: true,
      error: `Choose one of: ${options.join(", ")}`,
    };
  }
}

async function main() {
  const wb = new ExcelJS.Workbook();
  wb.creator = "TutorConnect";

  // ---- Instructions sheet ----
  const info = wb.addWorksheet("Instructions");
  info.columns = [{ width: 100 }];
  const lines = [
    "TutorConnect data import template",
    "",
    "How to use this file:",
    "1. Fill in the 'Teachers' sheet with every instructor first.",
    "2. Fill in the 'Courses' sheet. Each course must reference an Instructor Email that",
    "   exists either in the Teachers sheet of this file, or already in TutorConnect.",
    "3. Save the file (keep it as .xlsx) and send it back — do not rename the sheet tabs.",
    "4. Leave a cell empty only for fields marked optional below. Do not delete columns.",
    "",
    "Teachers sheet — required columns: Name, Email, Country, Subjects.",
    "  Subjects: comma-separated, e.g. \"Physics, Mathematics\"",
    "  Years Experience / Hourly Rate (USD): numbers only, optional.",
    "  Status: Approved / Pending / Rejected (defaults to Approved if left blank).",
    "",
    "Courses sheet — required columns: Title, Instructor Email, Category, Price (USD),",
    "  Original Price (USD), Duration (Hours), Lecture Count, What You'll Learn.",
    "  Category must be one of: " + CATEGORIES.join(", "),
    "  Level must be one of: " + LEVELS.join(", ") + " (defaults to All Levels).",
    "  What You'll Learn: separate each bullet point with a pipe character, e.g.",
    "    \"Master the basics|Build 3 real projects|Pass the final exam\"",
    "  Bestseller / Premium / New: Yes or No (defaults to No).",
    "  Rating / Review Count: optional, defaults to 4.8 and 0.",
    "",
    "Re-uploading the same file is safe — existing rows are matched by Email (Teachers)",
    "and Title (Courses) and updated in place rather than duplicated.",
  ];
  lines.forEach((line, i) => {
    const cell = info.getCell(`A${i + 1}`);
    cell.value = line;
    if (i === 0) cell.font = { bold: true, size: 14 };
  });

  // ---- Teachers sheet ----
  const teachers = wb.addWorksheet("Teachers");
  teachers.columns = [
    { header: "Name", key: "name", width: 24 },
    { header: "Email", key: "email", width: 30 },
    { header: "Country", key: "country", width: 20 },
    { header: "Subjects (comma-separated)", key: "subjects", width: 32 },
    { header: "Years Experience", key: "yearsExperience", width: 16 },
    { header: "Hourly Rate (USD)", key: "hourlyRate", width: 16 },
    { header: "Bio", key: "bio", width: 50 },
    { header: "Status", key: "status", width: 14 },
  ];
  teachers.addRow({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    country: "Toronto, Canada",
    subjects: "Biology, Chemistry",
    yearsExperience: 6,
    hourlyRate: 42,
    bio: "Short instructor bio shown on their profile.",
    status: "Approved",
  });
  styleHeader(teachers);
  addListValidation(teachers, "H", TEACHER_STATUS);

  // ---- Courses sheet ----
  const courses = wb.addWorksheet("Courses");
  courses.columns = [
    { header: "Title", key: "title", width: 34 },
    { header: "Subtitle", key: "subtitle", width: 40 },
    { header: "Instructor Email", key: "instructorEmail", width: 28 },
    { header: "Category", key: "category", width: 18 },
    { header: "Level", key: "level", width: 14 },
    { header: "Price (USD)", key: "price", width: 12 },
    { header: "Original Price (USD)", key: "originalPrice", width: 16 },
    { header: "Duration (Hours)", key: "durationHours", width: 14 },
    { header: "Lecture Count", key: "lectureCount", width: 14 },
    { header: "Rating", key: "rating", width: 10 },
    { header: "Review Count", key: "reviewCount", width: 12 },
    { header: "What You'll Learn (separate with |)", key: "whatYoullLearn", width: 60 },
    { header: "Bestseller", key: "bestseller", width: 12 },
    { header: "Premium", key: "premium", width: 12 },
    { header: "New", key: "isNew", width: 10 },
  ];
  courses.addRow({
    title: "Biology Fundamentals: Cells to Systems",
    subtitle: "A friendly introduction to biology with real lab examples.",
    instructorEmail: "jane.doe@example.com",
    category: "Science",
    level: "Beginner",
    price: 29.99,
    originalPrice: 49.99,
    durationHours: 8,
    lectureCount: 50,
    rating: 4.8,
    reviewCount: 0,
    whatYoullLearn: "Understand cell structure|Explain how organ systems work|Prepare for exam-style questions",
    bestseller: "No",
    premium: "No",
    isNew: "Yes",
  });
  styleHeader(courses);
  addListValidation(courses, "D", CATEGORIES);
  addListValidation(courses, "E", LEVELS);
  addListValidation(courses, "M", YES_NO);
  addListValidation(courses, "N", YES_NO);
  addListValidation(courses, "O", YES_NO);

  const outPath = process.argv[2] ?? "TutorConnect-Import-Template.xlsx";
  await wb.xlsx.writeFile(outPath);
  console.log(`Template written to ${outPath}`);
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
