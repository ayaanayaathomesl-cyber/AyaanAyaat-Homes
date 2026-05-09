const fs = require('fs');

function moveSection(file) {
  const content = fs.readFileSync(file, 'utf-8');

  const facilitiesRegex = /\s*\{\/\* (Facilities Section|ALL FEATURES SECTION) \*\/\}\s*<section id="facilities"[\s\S]*?<\/section>/;
  const galleryRegex = /\s*\{\/\* Gallery Section \*\/\}\s*<section id="gallery"[\s\S]*?<\/section>/;

  const facilitiesMatch = content.match(facilitiesRegex);
  const galleryMatch = content.match(galleryRegex);

  if (facilitiesMatch && galleryMatch) {
    let newContent = content.replace(facilitiesMatch[0], '');
    
    const galleryMatchUpdated = newContent.match(galleryRegex);
    const insertIndex = galleryMatchUpdated.index + galleryMatchUpdated[0].length;
    
    newContent = newContent.slice(0, insertIndex) + '\n' + facilitiesMatch[0] + newContent.slice(insertIndex);
    
    fs.writeFileSync(file, newContent, 'utf-8');
    console.log(`Successfully reordered in ${file}`);
  } else {
    console.log(`Could not find sections in ${file}.`);
  }
}

moveSection('components/MaleHostel.tsx');
