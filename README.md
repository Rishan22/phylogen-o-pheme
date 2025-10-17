
---

### Name

`Procedural Lexicon Constructor

---

### Description

a small command-line program that invents new words.
It takes real parts (like bio, geo, chrono) and combines them in different ways to sound believable. It can also show how those words might change over time, the same way real languages evolve.

---

### Core Features

- Break down words to see their building blocks.
- Create new words that look and sound natural.
- Simulate sound changes across generations.
- Export results in text, table, CSV, or JSON format.

---

### Command Syntax

#updated_version

```
node dex.js <command> [args]
```

#### Commands

```
parse <text>
    Decompose words into morphemes

craft <seeds> [phon] [size] [min] [max] [gen] [fmt]
    Generate synthetic lexicon
      seeds: comma-separated morphemes (e.g., bio,geo,chrono)
      phon:  s=simple c=complex f=soft h=harsh t=tonal (default: s)
      size:  number of words (default: 50)
      min:   minimum morphemes per word (default: 1)
      max:   maximum morphemes per word (default: 2)
      gen:   number of sound-change generations (default: 0)
      fmt:   tbl|json|csv|md (default: tbl)

list
    Display available morphemes

help
    Show this command summary
```

---

### Example Usage

```
# Parse existing word
node dex.js parse diachronic transformations

# Generate 100-entry lexicon from roots
node dex.js craft bio,geo,chrono c 100 1 3 5 md > lexicon.md

# Minimal 20-word lexicon with drift
node dex.js craft thermo,photo s 20 1 2 3 tbl
```

---

### Output Formats

| Format   | Description                                                    |
| -------- | -------------------------------------------------------------- |
| **tbl**  | Fixed-width text table with gloss and generation info          |
| **md**   | Markdown-formatted lexicon table                               |
| **csv**  | Comma-separated lexicon entries                                |
| **json** | Structured export with full morpheme mapping and drift history |

---

### Internal Structure

* **Morpheme database (`M`)** — core prefix/suffix/root set with IPA, gloss, weight, and origin.
* **Phonotactics (`P`)** — defines onset/nucleus/coda templates per phonological style.
* **Feature grid (`F`)** — defines consonantal articulation traits for assimilation logic.
* **Assimilation and drift modules** — apply context-sensitive phonetic and diachronic transformations.
* **Formatting layer (`fmt`)** — serializes lexicon data into the requested format.

---

