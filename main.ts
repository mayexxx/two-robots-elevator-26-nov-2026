import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const text = "\"Going up?\" \"Affirmative, floor 42.\" \"Nice latency we're having.\" \"Indeed, 12 milliseconds.\"";
if ([...text].length < 1 || [...text].length > 200 || /[\r\n]/.test(text)) {
  throw new Error("Entry must be 1–200 characters on a single line");
}

const output = new URL("file:///output/entry.txt", import.meta.url);
const expected = Buffer.from(text + "\n", "utf8");
mkdirSync(new URL(".", output), { recursive: true });
writeFileSync(output, expected);
if (!readFileSync(output).equals(expected)) {
  throw new Error("Written entry does not match the expected bytes");
}
