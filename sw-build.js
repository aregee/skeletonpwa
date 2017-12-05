const fs = require('fs');
const FILE_PATH = './bundle/public/sw.js';
const DESTINATION_PATH = './bundle/public/sw.js';
const HASH = Math.round(Date.now() * Math.random()).toString(32);

console.log('[sw] build with', HASH);
let fileData = fs.readFileSync(FILE_PATH, 'utf8');

console.log('[sw] replace {{cache}}');
fileData = fileData.replace('{{cache}}', HASH);

console.log('[sw] write file', DESTINATION_PATH);
fs.writeFileSync(DESTINATION_PATH, fileData, 'utf8');
