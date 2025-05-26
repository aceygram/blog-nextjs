// npm-resolutions.cjs
const fs = require('fs');
const pkg = require('./package.json');

// // Add resolutions to force specific versions
// pkg.resolutions = {
//   "react": "18.2.0",
//   "react-dom": "18.2.0",
//   "@sanity/base": "2.36.4",
//   "@sanity/icons": "3.7.0",
//   "styled-components": "6.1.18"
// };

// Update package.json
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));