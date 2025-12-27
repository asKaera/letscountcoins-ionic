#!/usr/bin/env node
/**
 * Patch script to replace node-sass with modern sass package
 * This creates a compatibility shim so @ionic/app-scripts can work with dart-sass
 */

const fs = require('fs');
const path = require('path');

// Paths to patch
const paths = [
  // Root node_modules node-sass
  path.join(__dirname, '..', 'node_modules', 'node-sass'),
  // @ionic/app-scripts node-sass
  path.join(__dirname, '..', 'node_modules', '@ionic', 'app-scripts', 'node_modules', 'node-sass')
];

console.log('Patching node-sass to use dart-sass...');

let patched = false;

paths.forEach(nodeSassPath => {
  const nodeSassIndexPath = path.join(nodeSassPath, 'lib', 'index.js');
  const nodeSassBindingPath = path.join(nodeSassPath, 'lib', 'binding.js');

  // Check if node-sass directory exists
  if (fs.existsSync(nodeSassPath)) {
  // Create compatibility shim for index.js
  const shimContent = `// Compatibility shim to use modern 'sass' package instead of deprecated 'node-sass'
const sass = require('sass');

// Wrapper to make sass API compatible with node-sass API
module.exports = {
  render: function(options, callback) {
    try {
      const result = sass.renderSync(options);
      callback(null, result);
    } catch (err) {
      callback(err);
    }
  },
  
  renderSync: function(options) {
    return sass.renderSync(options);
  },
  
  info: sass.info || 'node-sass compatibility layer using dart-sass'
};
`;

  // Create binding.js shim to prevent binding errors
  const bindingShimContent = `// Compatibility shim - no native binding needed with dart-sass
module.exports = {};
`;

  try {
    fs.writeFileSync(nodeSassIndexPath, shimContent, 'utf8');
    fs.writeFileSync(nodeSassBindingPath, bindingShimContent, 'utf8');
    console.log(`✓ Successfully patched node-sass at ${nodeSassPath}!`);
    patched = true;
  } catch (err) {
    console.error('Error patching node-sass:', err.message);
  }
  } else {
    console.log(`node-sass not found at ${nodeSassPath}, skipping.`);
  }
});

if (!patched) {
  console.log('Warning: No node-sass installations were patched.');
}
