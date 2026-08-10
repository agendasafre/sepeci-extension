const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const indexHtml = fs.readFileSync(path.join(root, "index.html"), "utf8");
const mainJs = fs.readFileSync(path.join(root, "main.js"), "utf8");
const submitJs = fs.readFileSync(path.join(root, "api", "submit.js"), "utf8");
const sql = fs.readFileSync(
  path.join(root, "sql", "004_enrollment_submissions_extension.sql"),
  "utf8",
);
const formConfig = fs.readFileSync(path.join(root, "form-config.js"), "utf8");
const readme = fs.readFileSync(path.join(root, "README.md"), "utf8");

assert.ok(indexHtml.includes("Taller de factores críticos - Dimensión Extensión"));
assert.ok(indexHtml.includes("25 de agosto de 2026"));
assert.ok(indexHtml.includes("Escuela Universitaria de Ciencias de la Salud"));
assert.ok(indexHtml.includes('id="organization"'));
assert.ok(indexHtml.includes('id="residenceDepartment"'));
assert.ok(indexHtml.includes('value="Valle Fértil"'));
assert.ok(!indexHtml.includes("academic-units.js"));
assert.ok(!indexHtml.includes("researcherClassification"));

assert.ok(mainJs.includes("RESIDENCE_DEPARTMENT_VALUES"));
assert.ok(mainJs.includes("organization"));
assert.ok(mainJs.includes("residenceDepartment"));
assert.ok(mainJs.includes("Valle Fértil"));
assert.ok(!mainJs.includes("RESEARCHER_CLASSIFICATION_VALUES"));
assert.ok(!mainJs.includes("loadAcademicUnits"));

assert.ok(submitJs.includes("enrollment_submissions_extension"));
assert.ok(submitJs.includes("organization"));
assert.ok(submitJs.includes("residence_department"));
assert.ok(submitJs.includes("RESIDENCE_DEPARTMENT_VALUES"));
assert.ok(!submitJs.includes("enrollment_submissions_iyc"));
assert.ok(!submitJs.includes("getAcademicUnits"));

assert.ok(sql.includes("public.enrollment_submissions_extension"));
assert.ok(sql.includes("organization text not null"));
assert.ok(sql.includes("residence_department text not null"));
assert.ok(sql.includes("enrollment_submissions_extension_dni_key unique"));
assert.ok(sql.includes("'25 de Mayo'"));

assert.ok(formConfig.includes('startsAt: "2026-08-11T00:00:00-03:00"'));
assert.ok(formConfig.includes('expiresAt: "2026-08-20T23:59:59-03:00"'));

assert.match(readme, /Dimensión Extensión/i);
assert.match(readme, /enrollment_submissions_extension/i);
assert.match(readme, /Departamento de residencia/i);

console.log("Local verification passed.");
