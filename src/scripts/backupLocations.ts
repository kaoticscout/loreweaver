import { backupLocations } from '../utils/backupUtils';

console.log('Starting location backup...');

try {
  const backupPath = backupLocations();
  console.log(`Backup completed successfully! File saved at: ${backupPath}`);
} catch (error) {
  console.error('Error during backup:', error);
} 