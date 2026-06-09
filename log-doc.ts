import * as fs from 'fs';

async function check() {
  const config = JSON.parse(fs.readFileSync('firebase-applet-config.json', 'utf8'));
  const projectId = config.projectId;
  const dbId = config.firestoreDatabaseId;
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/${dbId}/documents/settings/homeBackgrounds`;
  
  const res = await fetch(url);
  const doc = await res.json();
  console.log(JSON.stringify(doc, null, 2));
}
check();
