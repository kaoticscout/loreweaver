import { writeFileSync } from 'fs';
import { join } from 'path';

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
function getRandomItems(arr: string[], count: number): string[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Function to convert image filename to path
function imageToPath(filename: string): string {
  return `/art/environments/cyberpunk/${filename}`;
}

// Main function to assign images
async function assignImages() {
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

  const imageAssignments: Record<string, string[]> = {};
  const usedImages: Set<string> = new Set();

  // Assign 3 images to each region
  for (const [regionId, regionData] of Object.entries(regions)) {
    const regionImages = getRandomItems(
      cyberpunkImages.filter(img => !usedImages.has(img)),
      3
    );
    imageAssignments[regionId] = regionImages.map(imageToPath);
    regionImages.forEach(img => usedImages.add(img));

    // Assign 3 images to each city in the region
    for (const cityId of regionData.cities) {
      const cityImages = getRandomItems(
        cyberpunkImages.filter(img => !usedImages.has(img)),
        3
      );
      imageAssignments[cityId] = cityImages.map(imageToPath);
      cityImages.forEach(img => usedImages.add(img));
    }

    // Assign 1 image to each location in the region
    for (const locationId of regionData.locations) {
      const locationImage = getRandomItems(
        cyberpunkImages.filter(img => !usedImages.has(img)),
        1
      );
      imageAssignments[locationId] = locationImage.map(imageToPath);
      locationImage.forEach(img => usedImages.add(img));
    }
  }

  // Create the output
  const output = `// Auto-generated cyberpunk image assignments
export const cyberpunkImageAssignments = ${JSON.stringify(imageAssignments, null, 2)};
`;

  // Write to file
  writeFileSync(
    join(process.cwd(), 'src', 'data', 'worlds', 'cyberpunk2077', 'image-assignments.ts'),
    output,
    'utf-8'
  );

  console.log('Image assignments have been generated and saved!');
}

// Run the script
assignImages().catch(console.error); 