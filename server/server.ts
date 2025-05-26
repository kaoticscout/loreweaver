import express from 'express';
import cors from 'cors';
import { DatabaseService } from '../src/services/database';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Test database connection
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });

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
    
    console.log('Sending worlds to client:', worlds);
    res.json(worlds);
  } catch (error) {
    console.error('Error fetching worlds:', error);
    res.status(500).json({ error: 'Failed to fetch worlds' });
  }
});

app.get('/api/worlds/featured', async (req, res) => {
  try {
    const worlds = await DatabaseService.getFeaturedWorlds();
    console.log('Sending featured worlds to client:', worlds);
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
      console.log('World not found:', req.params.id);
      res.status(404).json({ error: 'World not found' });
      return;
    }
    console.log('Sending world to client:', world);
    console.log('World rating:', world.rating);
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
    const { category, rarity } = req.query;
    let items;
    
    if (category) {
      items = await DatabaseService.getItemsByCategory(req.params.worldId, category as string);
    } else if (rarity) {
      items = await DatabaseService.getItemsByRarity(req.params.worldId, rarity as string);
    } else {
      items = await DatabaseService.getItemsByWorldId(req.params.worldId);
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

// Quest routes
app.get('/api/worlds/:worldId/quests', async (req, res) => {
  try {
    const quests = await DatabaseService.getQuestsByWorldId(req.params.worldId);
    res.json(quests);
  } catch (error) {
    console.error('Error fetching quests:', error);
    res.status(500).json({ error: 'Failed to fetch quests' });
  }
});

app.get('/api/quests/:id', async (req, res) => {
  try {
    const quest = await DatabaseService.getQuestById(req.params.id);
    if (!quest) {
      res.status(404).json({ error: 'Quest not found' });
      return;
    }
    res.json(quest);
  } catch (error) {
    console.error('Error fetching quest:', error);
    res.status(500).json({ error: 'Failed to fetch quest' });
  }
});

app.patch('/api/quests/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const quest = await DatabaseService.updateQuestStatus(req.params.id, status);
    res.json(quest);
  } catch (error) {
    console.error('Error updating quest status:', error);
    res.status(500).json({ error: 'Failed to update quest status' });
  }
});

// NPC routes
app.get('/api/worlds/:worldId/npcs', async (req, res) => {
  try {
    console.log('\n=== NPC Request ===');
    console.log('Fetching NPCs for world:', req.params.worldId);
    
    const npcs = await DatabaseService.getNPCsByWorldId(req.params.worldId);
    console.log('Successfully fetched NPCs:', npcs.length);
    res.json(npcs);
  } catch (error) {
    console.error('Error fetching NPCs:', error);
    res.status(500).json({ 
      error: 'Failed to fetch NPCs',
      details: error instanceof Error ? error.message : 'Unknown error',
      worldId: req.params.worldId
    });
  }
});

app.get('/api/npcs/:id', async (req, res) => {
  try {
    const npc = await DatabaseService.getNPCById(req.params.id);
    if (!npc) {
      res.status(404).json({ error: 'NPC not found' });
      return;
    }
    res.json(npc);
  } catch (error) {
    console.error('Error fetching NPC:', error);
    res.status(500).json({ error: 'Failed to fetch NPC' });
  }
});

app.patch('/api/npcs/:id', async (req, res) => {
  try {
    const npc = await DatabaseService.updateNPC(req.params.id, req.body);
    res.json(npc);
  } catch (error) {
    console.error('Error updating NPC:', error);
    res.status(500).json({ error: 'Failed to update NPC' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 