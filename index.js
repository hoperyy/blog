
const fs = require('fs');
const path = require('path');

const stats = fs.statSync('./target.js');
const birthtime = stats.birthtime.getTime();
const mtime = stats.mtime.getTime();

console.log('birthtime: ', birthtime);
console.log('mtime: ', mtime);
console.log('equal: ', birthtime === mtime);
