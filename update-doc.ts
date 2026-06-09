import * as fs from 'fs';

async function update() {
  const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
  const projectId = config.projectId;
  const dbId = config.firestoreDatabaseId;
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${dbId}/documents/settings/homeBackgrounds`;
  
  const res = await fetch(url);
  const doc = await res.json();
  
  // The suspected image is the first one
  const targetImage = doc.fields.images.arrayValue.values[0].stringValue;
  console.log("Removing:", targetImage);

  const newImages = doc.fields.images.arrayValue.values.filter(v => v.stringValue !== targetImage);

  const patchData = {
    fields: {
      images: {
        arrayValue: {
          values: newImages
        }
      }
    }
  };
  
  const patchRes = await fetch(`${url}?updateMask.fieldPaths=images`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(patchData)
  });
  
  console.log("Updated. Status:", patchRes.status);
}
update();
