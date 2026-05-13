import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'components');
const files = fs.readdirSync(componentsDir).filter(f => f.endsWith('.tsx'));

for (const file of files) {
  const filePath = path.join(componentsDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/font-serif /g, '');
  content = content.replace(/ font-serif/g, '');
  content = content.replace(/italic /g, '');
  content = content.replace(/ italic/g, '');
  fs.writeFileSync(filePath, content, 'utf8');
}
console.log('Removed font-serif and italic from all files in components directory.');
