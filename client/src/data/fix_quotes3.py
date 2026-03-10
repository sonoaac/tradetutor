
import re

with open('lessonsData.ts', 'r', encoding='utf-8') as f:
    c = f.read()

start = c.find("  'f1': {")
before = c[:start]
after = c[start:]

# Step 1: Revert ALL \' back to ' in the new section
after = after.replace("\\'", "'")

# Step 2: Now only escape TRUE apostrophes (contractions + possessives)
# Patterns to fix:
# - 's (possessive/contraction): word + 's + (space or word)  → word\'s
# - n't: n't → n\'t
# - 're 've 'll 'd at word boundaries

# Fix n't contractions
after = re.sub(r"n't", "n\\'t", after)

# Fix possessives ending in 's: word's
after = re.sub(r"([a-zA-Z0-9])'s([^a-zA-Z])", lambda m: m.group(1) + "\\'s" + m.group(2), after)
after = re.sub(r"([a-zA-Z0-9])'s$", lambda m: m.group(1) + "\\'s", after)

# Fix plural possessives: traders' books (s' followed by space+word)
after = re.sub(r"([a-zA-Z])' ([a-zA-Z])", lambda m: m.group(1) + "\\' " + m.group(2), after)

print('Fixed apostrophes')

with open('lessonsData.ts', 'w', encoding='utf-8') as f:
    f.write(before + after)
print('Done')
