import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// List of all available cyberpunk environment images
const cyberpunkImages = [
  '1 - 8a4jrOU.jpg',
  '2 - hxox7ZS.jpg',
  '3 - UfntLlJ.jpg',
  '4 - wspHrlZ.jpg',
  '5 - Bpk7rqL.jpg',
  '6 - GWUvFch.png',
  '7 - LZI0bUC.jpg',
  '8 - ZlnPzS7.jpg',
  '9 - tdzifMd.jpg',
  '10 - VCugv28.jpg',
  '11 - onEQ5fI.jpg',
  '12 - XhA6ruK.jpg',
  '13 - cfmHce0.jpg',
  '14 - mik2s6P.jpg',
  '15 - ECLJake.jpg',
  '16 - UdR5dcW.jpg',
  '17 - FNydZSQ.jpg',
  '18 - Cj0nJoH.jpg',
  '19 - jFIciPB.jpg',
  '20 - OmizL6l.jpg',
  '21 - brZKW0c.jpg',
  '22 - vbG5932.jpg',
  '23 - 2NPLWsO.jpg',
  '24 - oqSUGlq.png',
  '25 - U48eJ32.jpg',
  '26 - 1QgcDQQ.jpg',
  '27 - YTRT2si.jpg',
  '28 - W5HjpWP.jpg',
  '29 - sEVhOLq.jpg',
  '30 - xE3J4MZ.jpg',
  '31 - 7X6yBMs.jpg',
  '32 - eAsb026.jpg',
  '33 - 6XfQl9L.jpg',
  '34 - vbEy3gg.jpg',
  '35 - OBZCOb7.jpg',
  '36 - jRSpu3B.jpg',
  '37 - StpJt8b.jpg',
  '38 - t420m8O.jpg',
  '39 - XXI3y4g.jpg',
  '40 - 4kwLkn5.jpg',
  '41 - h6CUpb6.jpg',
  '42 - 3LH6vdf.jpg',
  '43 - y6D9z9J.jpg',
  '44 - B8TnC0a.jpg',
  '45 - 2yQh10f.jpg'
];

// Function to get random items from array
function getRandomItems(arr, count) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to convert image filename to path
function imageToPath(filename) {
  return `/art/environments/cyberpunk/${filename}`;
}

// Function to update file content with new images
function updateFileWithImages(filePath, images) {
  try {
    let content = readFileSync(filePath, 'utf-8');
    
    // Paths that should be updated
    const pathsToUpdate = [
      '/art/regions/',
      '/art/cities/',
      '/art/locations/',
      '/art/banners/',
      '/art/environments/'
    ];

    // Paths that should be preserved
    const pathsToPreserve = [
      '/art/npcs/',
      '/art/items/',
      '/art/avatars/'
    ];

    // Update image field if it matches our criteria
    if (images.length >= 1) {
      content = content.replace(
        /(image:\s*['"])(\/art\/[^'"]+)(['"])/g,
        (match, prefix, path, suffix) => {
          if (pathsToPreserve.some(p => path.startsWith(p))) {
            return match;
          }
          if (pathsToUpdate.some(p => path.startsWith(p)) || path.includes('locations') || path.includes('regions') || path.includes('cities')) {
            return `${prefix}${images[0]}${suffix}`;
          }
          return match;
        }
      );
    }

    // Update banner field if it matches our criteria
    if (images.length >= 2) {
      content = content.replace(
        /(banner:\s*['"])(\/art\/[^'"]+)(['"])/g,
        (match, prefix, path, suffix) => {
          if (pathsToPreserve.some(p => path.startsWith(p))) {
            return match;
          }
          if (pathsToUpdate.some(p => path.startsWith(p)) || path.includes('locations') || path.includes('regions') || path.includes('cities')) {
            return `${prefix}${images[1]}${suffix}`;
          }
          return match;
        }
      );
    }

    writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated ${filePath} with new images`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
  }
}

// Main function to assign images
async function assignImages() {
  const basePath = join(dirname(__dirname), 'data', 'worlds', 'cyberpunk2077');
  
  // Regions and their cities
  const regions = {
    'night-city': {
      cities: ['city-center', 'watson', 'heywood', 'westbrook', 'santo-domingo'],
      locations: [
        'afterlife-bar',
        'lizzys-bar',
        'viktors-clinic',
        'megabuilding-h10',
        'arasaka-tower',
        'konpeki-plaza',
        'clouds',
        'totalmages',
        'mistys-shop'
      ]
    },
    'pacifica': {
      cities: ['coastview', 'westwind'],
      locations: [
        'grand-imperial-mall',
        'batty-hotel',
        'stadion-love',
        'voodoo-chapel'
      ]
    }
  };

  const usedImages = new Set();

  // Update regions
  for (const [regionId, regionData] of Object.entries(regions)) {
    const regionImages = getRandomItems(
      cyberpunkImages.filter(img => !usedImages.has(img)),
      3
    ).map(imageToPath);
    regionImages.forEach(img => usedImages.add(img));
    
    const regionPath = join(basePath, 'regions', `${regionId}.ts`);
    updateFileWithImages(regionPath, regionImages);

    // Update cities
    for (const cityId of regionData.cities) {
      const cityImages = getRandomItems(
        cyberpunkImages.filter(img => !usedImages.has(img)),
        3
      ).map(imageToPath);
      cityImages.forEach(img => usedImages.add(img));
      
      const cityPath = join(basePath, 'cities', cityId, 'index.ts');
      updateFileWithImages(cityPath, cityImages);
    }

    // Update locations
    for (const locationId of regionData.locations) {
      const locationImage = getRandomItems(
        cyberpunkImages.filter(img => !usedImages.has(img)),
        2
      ).map(imageToPath);
      locationImage.forEach(img => usedImages.add(img));
      
      const locationPath = join(basePath, 'locations', `${locationId}.ts`);
      updateFileWithImages(locationPath, locationImage);
    }
  }

  console.log('All image assignments have been updated!');
}

// Run the script
assignImages().catch(console.error); 