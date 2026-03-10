
# Fix ALL unescaped apostrophes in the new lesson content
# Strategy: scan char by char, tracking whether we're inside a JS string

with open('lessonsData.ts', 'r', encoding='utf-8') as f:
    c = f.read()

start = c.find("  'f1': {")
before = c[:start]
after = c[start:]

# We need to escape any ' that appears within string content
# Approach: track string state - when inside a '-quoted string,
# any ' not preceded by \ ends or is a content apostrophe
# To distinguish: a content apostrophe is one where the resulting string
# makes syntactic sense. Instead, use a simpler heuristic:
# replace all ' that are preceded by a word char and followed by word char or space

chars = list(after)
i = 0
fixed = 0
while i < len(chars):
    if chars[i] == "'":
        prev_is_word = i > 0 and (chars[i-1].isalnum() or chars[i-1] == '_')
        prev_is_backslash = i > 0 and chars[i-1] == '\\'
        next_char = chars[i+1] if i+1 < len(chars) else ''
        next_is_word_or_space = next_char.isalpha() or next_char == ' ' or next_char == '\n'

        # It's a content apostrophe if prev is word char and next is word/space
        if prev_is_word and not prev_is_backslash and next_is_word_or_space:
            chars.insert(i, '\\')
            i += 1
            fixed += 1
    i += 1

print(f'Fixed {fixed} apostrophes')
result = before + ''.join(chars)

with open('lessonsData.ts', 'w', encoding='utf-8') as f:
    f.write(result)
print('Done')
