const fs = require('fs');

const profileRaw = fs.readFileSync('src/profile.json', 'utf8');
const data = JSON.parse(profileRaw);
const appJsRaw = fs.readFileSync('src/app.js', 'utf8');

// To evaluate app.js, we need to extract the logic inside fetch.then((data) => { ... })
// A simple regex to grab the body of the fetch callback:
const fetchBodyMatch = appJsRaw.match(/fetch\("profile\.json"\)\s*\.then\(\(r\)\s*=>\s*r\.json\(\)\)\s*\.then\(\(data\)\s*=>\s*\{([\s\S]+?)\}\)\s*;/);

if (!fetchBodyMatch) {
  console.log("Could not find fetch body!");
  process.exit(1);
}

let fetchBody = fetchBodyMatch[1];

// Mock document
const mockDocument = {
  getElementById: (id) => ({
    id: id,
    set innerHTML(val) {
      // simulate rendering
    }
  })
};

// run the body
try {
  const func = new Function('data', 'document', fetchBody);
  func(data, mockDocument);
  console.log("SUCCESS! No errors in app.js rendering logic.");
} catch (e) {
  console.log("RUNTIME ERROR: ", e.toString());
  console.log(e.stack);
}
