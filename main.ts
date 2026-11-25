// The Tired Dark Lord: A 100-Word Villain Monologue — make.fun entry.
//
// The villain is secretly exhausted, but the tiredness lives in the
// rhythm, the pauses and the deflections — never in a plain statement
// that he is weary. He still has a scheme (the Obsidian Spire, the
// amulet) and a history (three centuries, a unionised workforce, a
// dragon who quit over the commute). The sting lands in the last line:
// the prophecy never mentioned the admin.
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// SETUP: the welcome, and the household of evil running on fumes.
const SETUP =
  "Come in, hero. Mind the— no, the trapdoor is fine, I had it oiled. Tuesdays. " +
  "The minions unionised, did you know? They want breaks. Breaks! From evil. " +
  "I spent three centuries building the Obsidian Spire, and nobody warns you about the paperwork. " +
  "Curses in triplicate. The dragon left — said the commute was killing him. ";

// PUNCH: the hero arrives mid-sentence; the sting is the admin.
const PUNCH =
  "And now you, sword raised, monologuing at me like I'm not already running on four hours of sleep and one cold cup of— " +
  "...Look. Take the amulet, hero, please. Honestly. I've been trying to lose it since the solstice, " +
  "and the prophecy never mentioned the admin.";

// The entry is the two parts joined: exactly 100 words, one breath.
const TEXT = SETUP + PUNCH;

const WORDS = TEXT.trim().split(/\s+/).length;

function clearDir(dir: string): void {
  // Clear only the directory's contents, never the directory itself:
  // the grader runs on a read-only filesystem whose parent is not writable.
  for (const f of readdirSync(dir)) {
    rmSync(join(dir, f), { force: true, recursive: true });
  }
}

function main(): void {
  // Gate: 1 to 600 characters, about 100 words, never only whitespace.
  if (TEXT.length < 1 || TEXT.length > 600) {
    throw new Error(`entry is ${TEXT.length} chars, gate is 1-600`);
  }
  if (WORDS < 95 || WORDS > 105) {
    throw new Error(`entry is ${WORDS} words, target is about 100`);
  }
  if (!TEXT.trim()) throw new Error("entry is only whitespace");
  const outDir = "/output";
  mkdirSync(outDir, { recursive: true });
  clearDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), TEXT, "utf8");
}

main();
