#!/usr/bin/env node
/**
 * Fix multi-line strings in ionic.functions.scss for dart-sass compatibility
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'node_modules', 'ionic-angular', 'themes', 'ionic.functions.scss');

console.log('Fixing Ionic Angular SCSS multi-line strings...');

if (fs.existsSync(filePath)) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Fix all multi-line strings by converting them to single-line strings
  // This is more compatible with dart-sass
  
  // Replace the first error message
  content = content.replace(
    /@function color-error\(\$color-value, \$color-name: null\) \{[\s\S]*?@if \(\$color-name\)/m,
    `@function color-error($color-value, $color-name: null) {
  $error-msg: "The value must be a color. If you are setting the value as a map make sure both the base and contrast are defined as colors.";

  // If there was a name passed it means the value doesn't exist
  // so error that the value isn't defined
  @if ($color-name)`
  );
  
  // Replace the second error message
  content = content.replace(
    /@if \(\$color-name\) \{[\s\S]*?\$error-msg: "[\s\S]*?";[\s\S]*?\}/m,
    `@if ($color-name) {
    $error-msg: "The map color is not defined. Please make sure the color exists in your colors map.";
  }`
  );
  
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('✓ Successfully fixed ionic.functions.scss!');
} else {
  console.log('ionic.functions.scss not found, skipping.');
}
