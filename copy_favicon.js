import fs from 'fs';
import path from 'path';

const src = path.join(process.cwd(), 'public', 'logo.png');
const dest = path.join(process.cwd(), 'public', 'favicon.ico');

try {
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Successfully copied logo.png to favicon.ico');
  } else {
    console.error('Source logo.png not found at:', src);
  }
} catch (err) {
  console.error('Error copying favicon:', err);
}
