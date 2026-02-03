# Study Guides - PDF Conversion Instructions

## Current Status
The study guides are currently in HTML format with embedded styling that matches your requirements:
- Times New Roman font
- 15pt font size
- Double spacing (line-height: 2)
- Black text
- Proper academic formatting

## Converting to PDF

### Option 1: Using Browser (Easiest)
1. Open each HTML file in your browser (Chrome, Firefox, Edge)
2. Press `Ctrl+P` (Windows) or `Cmd+P` (Mac)
3. In print dialog:
   - Destination: "Save as PDF"
   - Paper size: Letter (8.5 x 11 inches)
   - Margins: Normal (1 inch)
   - Scale: Default
   - Background graphics: Enabled
4. Click "Save" and name file as `lesson-X.pdf`

### Option 2: Using Microsoft Word
1. Open HTML file in Microsoft Word
2. The formatting should be preserved
3. Go to File > Save As > PDF
4. Save with filename `lesson-X.pdf`

### Option 3: Using Command Line (Advanced)
Install wkhtmltopdf: https://wkhtmltopdf.org/

```bash
wkhtmltopdf --page-size Letter --margin-top 1in --margin-right 1in --margin-bottom 1in --margin-left 1in lesson-1.html lesson-1.pdf
```

### Option 4: Using Python (Automated)
```python
from weasyprint import HTML

HTML('lesson-1.html').write_pdf('lesson-1.pdf')
```

## Files to Convert
- lesson-1.html → lesson-1.pdf (Trading Basics 101)
- lesson-2.html → lesson-2.pdf (Understanding Market Orders) - TO BE CREATED
- lesson-3.html → lesson-3.pdf (Reading Stock Charts) - TO BE CREATED  
- lesson-4.html → lesson-4.pdf (Technical Analysis Intro) - TO BE CREATED
- lesson-5.html → lesson-5.pdf (Risk Management Strategies) - TO BE CREATED
- lesson-6.html → lesson-6.pdf (Market Psychology) - TO BE CREATED

## Formatting Verification
After conversion, verify:
- ✓ Font is Times New Roman, 15pt
- ✓ Text is black
- ✓ Double spacing between lines
- ✓ 1-inch margins on all sides
- ✓ Academic citations are italicized
- ✓ Headers are properly sized (h1: 20pt, h2: 18pt, h3: 16pt)

## Adding More Study Guides
The HTML template is set up for easy duplication. To create more:
1. Copy lesson-1.html
2. Rename to lesson-X.html
3. Update the title and content
4. Maintain the existing style block for consistent formatting
5. Convert to PDF using one of the methods above
