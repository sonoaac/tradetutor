
import re

with open('lessonsData.ts', 'r', encoding='utf-8') as f:
    c = f.read()

start = c.find("  'f1': {")
before = c[:start]
after = c[start:]

# Fix apostrophes: digit/letter followed by ' followed by letter
# but skip already escaped ones (preceded by backslash)
result_chars = list(after)
i = 0
fixed = 0
while i < len(result_chars):
    if result_chars[i] == "'":
        # Check if preceded by alphanumeric (and not backslash-escaped)
        if i > 0 and result_chars[i-1] != '\\' and (result_chars[i-1].isalnum()):
            # Check if followed by alpha
            if i + 1 < len(result_chars) and result_chars[i+1].isalpha():
                result_chars.insert(i, '\\')
                i += 1
                fixed += 1
    i += 1

fixed_after = ''.join(result_chars)
print(f'Fixed {fixed} apostrophes')

final = before + fixed_after
with open('lessonsData.ts', 'w', encoding='utf-8') as f:
    f.write(final)
print('Done')
