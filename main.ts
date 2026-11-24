// Worst AI Advice — one line, 140 chars max.
// The joke: a confident AI tells the user to delete System32,
// then invents a reassuring "safety net" that does not exist.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

const SETUP = "To free up disk space, delete the System32 folder";
const PAYOFF = "Windows keeps a spare copy in the cloud";

// One em dash joins setup and payoff: the pause is where the
// confident AI pivots from the disaster to its invented safety net.
function buildLine(setup: string, payoff: string): string {
  return `${setup} \u2014 ${payoff}.`;
}
const LINE = buildLine(SETUP, PAYOFF);

function check(line: string): void {
  if (line.trim().length === 0) throw new Error("empty line");
  if (line.length > 140) throw new Error(`line is ${line.length} chars, over 140`);
  if (line.includes("\n")) throw new Error("line must be a single line");
  if (/\s{2,}/.test(line)) throw new Error("line has a double space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
check(LINE);
mkdirSync(outDir, { recursive: true });
const target = join(outDir, "entry.txt");
writeFileSync(target, LINE + "\n", "utf8");
chmodSync(target, 0o644);
console.log(`wrote ${LINE.length} chars to ${target}`);
