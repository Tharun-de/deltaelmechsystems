import sharp from 'sharp';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, '..', 'public');

async function generatePlaceholders() {
  // Ensure directories exist
  const dirs = [
    join(PUBLIC_DIR, 'images', 'services'),
    join(PUBLIC_DIR, 'images', 'testimonials'),
    join(PUBLIC_DIR, 'images')
  ];

  for (const dir of dirs) {
    await fs.mkdir(dir, { recursive: true });
  }

  // Generate service images
  const services = ['mechanical', 'civil', 'electrical', 'facility'];
  for (const service of services) {
    await sharp({
      create: {
        width: 800,
        height: 600,
        channels: 4,
        background: { r: 0, g: 122, b: 255, alpha: 0.1 }
      }
    })
    .jpeg({
      quality: 90,
      progressive: true
    })
    .toFile(join(PUBLIC_DIR, 'images', 'services', `${service}.jpg`));
  }

  // Generate testimonial images
  const testimonials = ['rajesh', 'priya', 'arun'];
  for (const person of testimonials) {
    await sharp({
      create: {
        width: 400,
        height: 400,
        channels: 4,
        background: { r: 200, g: 200, b: 200, alpha: 1 }
      }
    })
    .jpeg({
      quality: 90,
      progressive: true
    })
    .toFile(join(PUBLIC_DIR, 'images', 'testimonials', `${person}.jpg`));
  }

  // Generate hero 3D model
  await sharp({
    create: {
      width: 1200,
      height: 800,
      channels: 4,
      background: { r: 0, g: 122, b: 255, alpha: 0.2 }
    }
  })
  .png()
  .toFile(join(PUBLIC_DIR, 'images', 'hero-3d-model.png'));

  // Generate pattern SVG
  const patternSVG = `
    <svg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" stroke-width="0.5" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
    </svg>
  `;

  await fs.writeFile(join(PUBLIC_DIR, 'images', 'pattern.svg'), patternSVG);

  console.log('✅ Generated all placeholder images and SVG');
}

generatePlaceholders().catch(console.error); 