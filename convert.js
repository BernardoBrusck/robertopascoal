import sharp from 'sharp';

async function convertImage() {
  try {
    await sharp('public/image/Roberto-rio.jpeg')
      .webp({ quality: 80 })
      .toFile('public/image/Roberto-rio.webp');
    console.log('Conversion successful!');
  } catch (err) {
    console.error('Error during conversion:', err);
  }
}

convertImage();
