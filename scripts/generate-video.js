import { createCanvas } from 'canvas';
import { createWriteStream } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, '..', 'public');

// Create a gradient animation
const width = 1920;
const height = 1080;
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Create gradient
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#1E40AF');
gradient.addColorStop(1, '#1E3A8A');

// Fill background
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Add some subtle patterns
ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
ctx.lineWidth = 2;

for (let i = 0; i < 50; i++) {
  const x = Math.random() * width;
  const y = Math.random() * height;
  const size = Math.random() * 100 + 50;
  
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(x + size, y + size);
  ctx.stroke();
}

// Save the canvas as PNG
const out = createWriteStream(join(PUBLIC_DIR, 'videos', 'hero-background.png'));
const stream = canvas.createPNGStream();
stream.pipe(out);
out.on('finish', () => console.log('✅ Created background image')); 