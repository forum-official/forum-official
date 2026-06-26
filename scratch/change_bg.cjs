const { Jimp } = require('jimp');
const fs = require('fs');

function intToRGBA(pixel) {
  // Jimp v1 stores colors as RGBA 32-bit unsigned integers
  return {
    r: (pixel >> 24) & 0xFF,
    g: (pixel >> 16) & 0xFF,
    b: (pixel >> 8) & 0xFF,
    a: pixel & 0xFF
  };
}

function rgbaToInt(r, g, b, a) {
  return ((r << 24) | (g << 16) | (b << 8) | a) >>> 0;
}

async function processImage(inputPath, outputPath) {
  console.log(`Processing ${inputPath} -> ${outputPath}...`);
  try {
    const image = await Jimp.read(inputPath);
    const width = image.width;
    const height = image.height;
    
    // Get background color from the top-left corner pixel
    const bgPixel = image.getPixelColor(0, 0);
    const bgRgba = intToRGBA(bgPixel);
    console.log(`Detected background color at (0,0): R:${bgRgba.r} G:${bgRgba.g} B:${bgRgba.b} A:${bgRgba.a}`);
    
    let count = 0;
    // We will replace pixels that are close to the background color with pure white
    const threshold = 25; // color distance threshold (out of 255)
    
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const pixel = image.getPixelColor(x, y);
        const rgba = intToRGBA(pixel);
        
        // Calculate Euclidean distance in RGB space
        const distance = Math.sqrt(
          Math.pow(rgba.r - bgRgba.r, 2) +
          Math.pow(rgba.g - bgRgba.g, 2) +
          Math.pow(rgba.b - bgRgba.b, 2)
        );
        
        // If distance is within threshold, replace with pure white
        if (distance <= threshold) {
          // Pure white color
          image.setPixelColor(rgbaToInt(255, 255, 255, 255), x, y);
          count++;
        }
      }
    }
    
    await image.write(outputPath);
    console.log(`Successfully replaced ${count} pixels with white. Saved to ${outputPath}`);
  } catch (err) {
    console.error(`Failed to process ${inputPath}:`, err);
  }
}

async function main() {
  const images = [
    { src: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c3031bb6-d4f9-441a-a713-4a6ca5f79d42\\discussion_icon_1781783558316.png', dest: 'public/assets/icons/discussion_icon.png' },
    {src: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c3031bb6-d4f9-441a-a713-4a6ca5f79d42\\publisher_rating_icon_1781783572372.png', dest: 'public/assets/icons/publisher_rating_icon.png'},
    { src: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c3031bb6-d4f9-441a-a713-4a6ca5f79d42\\author_info_icon_1781783585208.png', dest: 'public/assets/icons/author_info_icon.png' },
    { src: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c3031bb6-d4f9-441a-a713-4a6ca5f79d42\\my_library_icon_1781783597636.png', dest: 'public/assets/icons/my_library_icon.png' },
    { src: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c3031bb6-d4f9-441a-a713-4a6ca5f79d42\\debate_icon_1781783610864.png', dest: 'public/assets/icons/debate_icon.png' },
    { src: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c3031bb6-d4f9-441a-a713-4a6ca5f79d42\\in_progress_clock_1781783625073.png', dest: 'public/assets/icons/in_progress_clock.png' },
    { src: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c3031bb6-d4f9-441a-a713-4a6ca5f79d42\\in_progress_gift_1781783638657.png', dest: 'public/assets/icons/in_progress_gift.png' },
    { src: 'C:\\Users\\USER\\.gemini\\antigravity\\brain\\c3031bb6-d4f9-441a-a713-4a6ca5f79d42\\in_progress_scaffold_1781783651364.png', dest: 'public/assets/icons/in_progress_scaffold.png' }
  ];

  for (const img of images) {
    if (fs.existsSync(img.src)) {
      console.log(`Found generated file. Copying ${img.src} -> ${img.dest}...`);
      fs.copyFileSync(img.src, img.dest);
      await processImage(img.dest, img.dest);
    } else {
      console.error(`Warning: ${img.src} does not exist!`);
    }
  }
}

main();
