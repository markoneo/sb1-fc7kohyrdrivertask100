import Jimp from 'jimp';
import fs from 'fs/promises';
import path from 'path';

const sizes = [72, 96, 128, 144, 152, 167, 180, 192, 384, 512];

async function generateIcons() {
  const iconPath = './public/icons/icon.svg';
  const iconBuffer = await fs.readFile(iconPath);
  
  for (const size of sizes) {
    const image = await Jimp.read(iconBuffer);
    await image.resize(size, size);
    await image.writeAsync(`./public/icons/icon-${size}x${size}.png`);
  }
}

generateIcons().catch(console.error);