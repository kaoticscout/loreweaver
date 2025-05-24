import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Enable CORS for the Vite frontend
app.use(cors());
app.use(express.json());

// Backup endpoint
app.post('/api/backup', async (req, res) => {
  try {
    const backupPath = join(__dirname, 'src', 'data', 'backups', 'default_locations.json');
    await fs.writeFile(backupPath, JSON.stringify(req.body, null, 2));
    res.json({ message: 'Backup saved successfully' });
  } catch (error) {
    console.error('Error saving backup:', error);
    res.status(500).json({ message: 'Failed to save backup' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 