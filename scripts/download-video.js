import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PUBLIC_DIR = join(__dirname, '..', 'public');

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest).catch(() => {});
      reject(err);
    });
  });
}

async function setupVideo() {
  const videoDir = join(PUBLIC_DIR, 'videos');
  await fs.mkdir(videoDir, { recursive: true });

  // Using a pre-optimized engineering/industrial video from a CDN
  const videoUrl = 'https://res.cloudinary.com/demo/video/upload/v1710134510/engineering-background.mp4';
  const finalPath = join(videoDir, 'hero-background.mp4');

  console.log('📥 Downloading optimized video...');
  try {
    await downloadFile(videoUrl, finalPath);
    console.log('✅ Video setup complete!');
  } catch (error) {
    console.error('❌ Failed to download video:', error.message);
    // Create a fallback colored background video
    const fallbackVideoPath = join(videoDir, 'hero-background.mp4');
    const fallbackVideo = `
      <svg width="1920" height="1080" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#1E40AF;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1E3A8A;stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grad)"/>
      </svg>
    `;
    await fs.writeFile(fallbackVideoPath.replace('.mp4', '.svg'), fallbackVideo);
    console.log('ℹ️ Created fallback background');
  }
}

setupVideo().catch(console.error); 