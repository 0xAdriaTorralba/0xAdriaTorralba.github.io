#!/usr/bin/env node
/**
 * Validate every hand-maintained data file + audit front matter against its
 * JSON Schema. Runs in ~3 s. First line of defence in the fast CI lane.
 *
 * Usage: node scripts/validate-data.mjs
 * Exit code: 0 on success, 1 if any file fails.
 */

import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import yaml from "js-yaml";
import matter from "gray-matter";
import { readFileSync, readdirSync } from "node:fs";
import { join, basename } from "node:path";

const ajv = new Ajv2020({ allErrors: true, strict: false });
addFormats(ajv);

function loadSchema(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function normalizeDates(value) {
  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }
  if (Array.isArray(value)) {
    return value.map(normalizeDates);
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = normalizeDates(v);
    return out;
  }
  return value;
}

function loadYaml(path) {
  return normalizeDates(yaml.load(readFileSync(path, "utf8")));
}

function report(label, ok, errors) {
  if (ok) {
    console.log(`  \u2713 ${label}`);
    return true;
  }
  console.error(`  \u2717 ${label}`);
  for (const err of errors ?? []) {
    const loc = err.instancePath || "(root)";
    console.error(`      ${loc} ${err.message}`);
    if (err.params) {
      const extras = Object.entries(err.params)
        .filter(([k]) => k !== "schema")
        .map(([k, v]) => `${k}=${JSON.stringify(v)}`)
        .join(", ");
      if (extras) console.error(`        ${extras}`);
    }
  }
  return false;
}

const validatorCache = new Map();
function compileOnce(schemaPath) {
  if (!validatorCache.has(schemaPath)) {
    validatorCache.set(schemaPath, ajv.compile(loadSchema(schemaPath)));
  }
  return validatorCache.get(schemaPath);
}

function validateYaml(dataPath, schemaPath) {
  let data;
  try {
    data = loadYaml(dataPath);
  } catch (e) {
    return report(dataPath, false, [{ instancePath: "", message: `YAML parse error: ${e.message}` }]);
  }
  const validate = compileOnce(schemaPath);
  return report(dataPath, validate(data), validate.errors);
}

function validateAudit(mdPath) {
  const validate = compileOnce("schemas/audit.json");
  const raw = readFileSync(mdPath, "utf8");
  const { data } = matter(raw);
  const normalized = normalizeDates(data);
  return report(mdPath, validate(normalized), validate.errors);
}

let ok = true;

console.log("Schema-validating _data/*.yml:");
const dataPairs = [
  ["_data/ctf_progress.yml", "schemas/ctf_progress.json"],
  ["_data/certifications.yml", "schemas/certifications.json"],
  ["_data/contributions.yml", "schemas/contributions.json"],
  ["_data/professional_experience.yml", "schemas/professional_experience.json"],
  ["_data/socials.yml", "schemas/socials.json"],
  ["_data/cv.yml", "schemas/generic.json"],
  ["_data/.cv.yml", "schemas/generic.json"],
  ["_data/grants.yml", "schemas/generic.json"],
  ["_data/service.yml", "schemas/generic.json"],
  ["_data/talks.yml", "schemas/generic.json"],
  ["_data/venues.yml", "schemas/generic.json"],
  ["_data/coauthors.yml", "schemas/generic.json"],
  ["_data/repositories.yml", "schemas/generic.json"],
];
for (const [dataPath, schemaPath] of dataPairs) {
  if (!validateYaml(dataPath, schemaPath)) ok = false;
}

console.log("\nSchema-validating _audits/*.md front matter:");
const auditDir = "_audits";
for (const entry of readdirSync(auditDir)) {
  if (!entry.endsWith(".md")) continue;
  if (entry === "TEMPLATE.md") continue;
  const mdPath = join(auditDir, entry);
  if (!validateAudit(mdPath)) ok = false;
}

if (!ok) {
  console.error("\nSchema validation failed. See errors above.");
  process.exit(1);
}
console.log("\nAll schema checks passed.");
