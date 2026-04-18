import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const inputDir = path.join(__dirname, '../public/infancia');

// Map original filenames to clean names
const files = fs.readdirSync(inputDir).filter(f => f.endsWith('.png') || f.endsWith('.jpg') || f.endsWith('.jpeg'));

console.log(`\n📂 Found ${files.length} images to process...\n`);

// Simple sequential numbering after removing the Gemini prefix
const cleanName = (filename, index) => {
  const hash = filename.replace(/^Gemini_Generated_Image_/, '').replace(/\.(png|jpg|jpeg)$/, '');
  return `infancia_${String(index + 1).padStart(2, '0')}_${hash.slice(0, 8)}`;
};

let totalOriginal = 0;
let totalNew = 0;
const outputFiles = [];

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const inputPath = path.join(inputDir, file);
  const newName = cleanName(file, i);
  const outputPath = path.join(inputDir, `${newName}.webp`);

  const originalSize = fs.statSync(inputPath).size;
  totalOriginal += originalSize;

  try {
    await sharp(inputPath)
      .webp({ quality: 82, effort: 4 })
      .toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    totalNew += newSize;
    const saving = (((originalSize - newSize) / originalSize) * 100).toFixed(1);

    console.log(`✅ ${file}`);
    console.log(`   → ${newName}.webp`);
    console.log(`   ${(originalSize / 1024 / 1024).toFixed(2)} MB → ${(newSize / 1024 / 1024).toFixed(2)} MB  (${saving}% menor)\n`);

    outputFiles.push({ original: file, outputPath, inputPath });
  } catch (err) {
    console.error(`❌ Erro ao processar ${file}:`, err.message);
  }
}

// Delete original PNGs after successful conversion
console.log('🗑️  Removendo arquivos originais...');
for (const { inputPath } of outputFiles) {
  fs.unlinkSync(inputPath);
}

const totalSaving = (((totalOriginal - totalNew) / totalOriginal) * 100).toFixed(1);
console.log('\n🎉 Concluído!');
console.log(`   Total original: ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Total novo:     ${(totalNew / 1024 / 1024).toFixed(2)} MB`);
console.log(`   Economia total: ${totalSaving}%\n`);
