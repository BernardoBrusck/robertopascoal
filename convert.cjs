const sharp = require('sharp'); 
const fs = require('fs'); 
const path = require('path'); 
const dir = path.join(__dirname, 'public/hero'); 
const outDir = path.join(__dirname, 'public/image'); 
fs.readdirSync(dir).forEach(file => { 
  if (file.match(/\.(png|jpg|jpeg|webp)$/i)) { 
    let outName = file.replace(/\.(png|jpg|jpeg)$/i, '.webp').replace(/\s+/g, '-').toLowerCase(); 
    sharp(path.join(dir, file))
      .webp({ quality: 85 })
      .toFile(path.join(outDir, outName))
      .then(() => console.log('Converted ' + file + ' to ' + outName))
      .catch(e => console.error(e)); 
  } 
});
