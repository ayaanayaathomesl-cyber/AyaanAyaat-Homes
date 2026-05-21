const fs = require('fs');
const path = require('path');

const dir = './components';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.tsx') || file.endsWith('.ts')) {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/#002147/g, '#4a3426');
    content = content.replace(/#003b80/g, '#3d2b1f');
    content = content.replace(/#001229/g, '#2b1c11');
    content = content.replace(/#003366/g, '#5c4033');
    content = content.replace(/#001530/g, '#2b1c11');
    // Change home background image
    if (file === 'Home.tsx') {
        content = content.replace('https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=2000', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=80');
    }
    fs.writeFileSync(filePath, content, 'utf8');
  }
});
console.log('Replaced colors successfully');
