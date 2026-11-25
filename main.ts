import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const text = "\"Going up?\" \"Affirmative, floor 42.\" \"Nice latency we're having.\" \"Indeed, 12 milliseconds.\"";
if ([...text].length < 1 || [...text].length > 200 || /[\r\n]/.test(text)) {
  throw new Error("Entry must be a single line of 1 to 200 characters");
}

const expected = Buffer.from(`${text}\n`, "utf8");
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", expected);
if (!readFileSync("/output/entry.txt").equals(expected)) {
  throw new Error("Written entry does not match expected bytes");
}
