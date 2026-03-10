
import re

with open('lessonsData.ts', 'r', encoding='utf-8') as f:
    c = f.read()

start = c.find("  'f1': {")
before = c[:start]
after = c[start:]

# Fix contractions: you've, you're, you'll, I'd, we've, they're etc.
# Pattern: word char + apostrophe + (ve|re|ll|d|m) + non-word or end

def fix_contraction(text, contraction_suffix):
    """Fix word + 'suffix patterns"""
    i = 0
    chars = list(text)
    fixed = 0
    target = "'" + contraction_suffix
    while i < len(chars) - len(target):
        match = True
        for j, ch in enumerate(target):
            if chars[i + j] != ch:
                match = False
                break
        if match:
            # Check previous char is a word char
            if i > 0 and chars[i-1].isalpha():
                # Check it's not already escaped
                if i == 0 or chars[i-1] != '\\':
                    chars.insert(i, '\\')
                    i += 1
                    fixed += 1
        i += 1
    return ''.join(chars), fixed

total_fixed = 0
for suffix in ["ve", "re", "ll", "m "]:
    after, n = fix_contraction(after, suffix)
    total_fixed += n
    print(f"  Fixed {n} for '{suffix}")

print(f"Total: {total_fixed}")

with open('lessonsData.ts', 'w', encoding='utf-8') as f:
    f.write(before + after)
print('Done')
