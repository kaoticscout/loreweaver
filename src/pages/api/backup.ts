import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const backupPath = path.join(process.cwd(), 'src', 'data', 'backups', 'default_locations.json');
    
    // Write the backup data to the file
    await fs.promises.writeFile(backupPath, JSON.stringify(req.body, null, 2));
    
    res.status(200).json({ message: 'Backup saved successfully' });
  } catch (error) {
    console.error('Error saving backup:', error);
    res.status(500).json({ message: 'Failed to save backup' });
  }
} 