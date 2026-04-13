import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const MAX_WIDTH = 1920;
const QUALITY = 78;

// Compress to NEW output file (avoids file lock issues)
const targets = [
  // Hero slider images → compress to optimized versions
  { input: 'public/hero/Pagina 01 - Confirmada 01.jpg', output: 'public/hero/hero-01.jpg', format: 'jpeg' },
  { input: 'public/hero/Página 01 - Confirmada 02.png', output: 'public/hero/hero-02.jpg', format: 'jpeg' },
  { input: 'public/hero/Página 01 - Confirmada 03.jpg', output: 'public/hero/hero-03.jpg', format: 'jpeg' },
  { input: 'public/hero/Página 01 - Confirmada 04.png', output: 'public/hero/hero-04.jpg', format: 'jpeg' },
  { input: 'public/hero/01 - África 06 por Max Schwoelk.JPG', output: 'public/hero/hero-05.jpg', format: 'jpeg' },
  
  // ZoomParallax images → compressed webp
  { input: 'public/image/Eu-e-minha-irmã.webp', output: 'public/image/eu-e-minha-irma-opt.webp', format: 'webp' },
  { input: 'public/image/Foto-05-Beto-Pag-11.webp', output: 'public/image/foto-05-beto-opt.webp', format: 'webp' },
  { input: 'public/image/Foto-10-Mãe-e-Beto-Pg-14.webp', output: 'public/image/foto-10-mae-beto-opt.webp', format: 'webp' },
  { input: 'public/image/roberto-pascoal-retrato-3.webp', output: 'public/image/retrato-3-opt.webp', format: 'webp' },
  { input: 'public/image/roberto-pascoal-retrato-1.webp', output: 'public/image/retrato-1-opt.webp', format: 'webp' },

  // Manifesto images → compressed webp
  { input: 'public/Selecionadas/manifesto-sentido.jpg', output: 'public/Selecionadas/manifesto-sentido-opt.webp', format: 'webp' },
  { input: 'public/Selecionadas/manifesto-autoconhecimento.jpg', output: 'public/Selecionadas/manifesto-autoconhecimento-opt.webp', format: 'webp' },
  { input: 'public/Selecionadas/manifesto-foco-com-alma.jpg', output: 'public/Selecionadas/manifesto-foco-com-alma-opt.webp', format: 'webp' },
  { input: 'public/Selecionadas/manifesto-territorio.jpg', output: 'public/Selecionadas/manifesto-territorio-opt.webp', format: 'webp' },
  { input: 'public/Selecionadas/manifesto-forca-de-realizacao.jpg', output: 'public/Selecionadas/manifesto-forca-de-realizacao-opt.webp', format: 'webp' },
];

async function compressImage(target) {
  const inputPath = path.resolve(target.input);
  const outputPath = path.resolve(target.output);
  
  if (!fs.existsSync(inputPath)) {
    console.log(`⏭ SKIP (not found): ${target.input}`);
    return;
  }

  const originalSize = fs.statSync(inputPath).size;
  const originalMB = (originalSize / 1024 / 1024).toFixed(2);

  try {
    let pipeline = sharp(inputPath)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true });

    if (target.format === 'webp') {
      pipeline = pipeline.webp({ quality: QUALITY });
    } else if (target.format === 'jpeg') {
      pipeline = pipeline.jpeg({ quality: QUALITY, mozjpeg: true });
    } else if (target.format === 'png') {
      pipeline = pipeline.png({ quality: QUALITY, compressionLevel: 9 });
    }

    await pipeline.toFile(outputPath);

    const newSize = fs.statSync(outputPath).size;
    const newMB = (newSize / 1024 / 1024).toFixed(2);
    const savings = ((1 - newSize / originalSize) * 100).toFixed(0);

    console.log(`✅ ${originalMB}MB → ${newMB}MB (-${savings}%) | ${target.output}`);
  } catch (err) {
    console.error(`❌ ERROR ${target.input}:`, err.message);
  }
}

async function main() {
  console.log('\n🔧 Compressing images to optimized versions...\n');
  for (const target of targets) {
    await compressImage(target);
  }
  console.log('\n✅ All done! Update code references to use new filenames.\n');
}

main();
