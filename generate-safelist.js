const fs = require('fs');

const themeColors = JSON.parse(fs.readFileSync('./data/theme/colors.json', 'utf8'));

// Remove duplicates and sort alphabetically
const safelist = [...new Set(Object.values(themeColors))].sort();

fs.writeFileSync(
  './tailwind-safelist.json',
  JSON.stringify(safelist, null, 2)
);
