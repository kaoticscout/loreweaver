import express from 'express';
import cors from 'cors';
import { DatabaseService } from '../src/services/database';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// World routes
app.get('/api/worlds', async (req, res) => {
  try {
    const { theme } = req.query;
    let worlds;
    
    if (theme) {
      worlds = await DatabaseService.getWorldsByTheme(theme as string);
    } else {
      worlds = await DatabaseService.getAllWorlds();
    }
    
    res.json(worlds);
  } catch (error) {
    console.error('Error fetching worlds:', error);
    res.status(500).json({ error: 'Failed to fetch worlds' });
  }
});

app.get('/api/worlds/featured', async (req, res) => {
  try {
    const worlds = await DatabaseService.getFeaturedWorlds();
    res.json(worlds);
  } catch (error) {
    console.error('Error fetching featured worlds:', error);
    res.status(500).json({ error: 'Failed to fetch featured worlds' });
  }
});

app.get('/api/worlds/:id', async (req, res) => {
  try {
    const world = await DatabaseService.getWorldById(req.params.id);
    if (!world) {
      res.status(404).json({ error: 'World not found' });
      return;
    }
    res.json(world);
  } catch (error) {
    console.error('Error fetching world:', error);
    res.status(500).json({ error: 'Failed to fetch world' });
  }
});

// Region routes
app.get('/api/worlds/:worldId/regions', async (req, res) => {
  try {
    const regions = await DatabaseService.getRegionsByWorldId(req.params.worldId);
    res.json(regions);
  } catch (error) {
    console.error('Error fetching regions:', error);
    res.status(500).json({ error: 'Failed to fetch regions' });
  }
});

// Item routes
app.get('/api/worlds/:worldId/items', async (req, res) => {
  try {
    const { worldId } = req.params;
    const { category, rarity } = req.query;
    
    let items;
    if (category) {
      items = await DatabaseService.getItemsByCategory(worldId, category as string);
    } else if (rarity) {
      items = await DatabaseService.getItemsByRarity(worldId, rarity as string);
    } else {
      items = await DatabaseService.getItemsByWorldId(worldId);
    }
    
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await DatabaseService.getItemById(req.params.id);
    if (!item) {
      res.status(404).json({ error: 'Item not found' });
      return;
    }
    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'Failed to fetch item' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 