import express from 'express';
import cors from 'cors';
import { DatabaseService } from '../src/services/database';
import { PrismaClient } from '@prisma/client';
import { AuthService } from '../src/services/auth';
import { authenticateToken, requireRole, checkWorldAccess } from '../src/middleware/auth';

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

// Authentication routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.register({ email, password });
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Registration failed' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await AuthService.login({ email, password });
    res.json(result);
  } catch (error) {
    res.status(401).json({ error: error instanceof Error ? error.message : 'Login failed' });
  }
});

// Protected user routes
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const user = await AuthService.getUser(req.user!.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

app.patch('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { displayName, avatar, bio, preferences } = req.body;
    const user = await AuthService.updateUser(req.user!.id, {
      displayName,
      avatar,
      bio,
      preferences
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user profile' });
  }
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
    
    res.json(worlds);
  } catch (error) {
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

app.get('/api/worlds/:id', authenticateToken, checkWorldAccess('viewer'), async (req, res) => {
  try {
    const world = await prisma.world.findUnique({
      where: { id: req.params.id },
      include: {
        createdBy: true,
        sharedWith: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                username: true,
                displayName: true,
                avatar: true
              }
            }
          }
        }
      }
    });
    res.json(world);
  } catch (error) {
    console.error('Failed to fetch world:', error);
    res.status(500).json({ error: 'Failed to fetch world' });
  }
});

// Region routes
app.get('/api/worlds/:worldId/regions', async (req, res) => {
  try {
    const regions = await prisma.region.findMany({
      where: { worldId: req.params.worldId },
      include: {
        locations: true
      }
    });
    res.json(regions.map(region => ({
      ...region,
      locations: region.locations.map(location => ({
        id: location.id,
        name: location.name,
        description: location.description,
        type: location.type,
        coordinates: location.coordinates,
        population: location.population,
        primaryRaces: location.primaryRaces,
        notableFeatures: location.notableFeatures,
        services: location.services,
        localGovernment: location.localGovernment,
        significance: location.significance,
        history: location.history,
        worldId: location.worldId,
        regionId: location.regionId
      }))
    })));
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

app.get('/api/worlds/:worldId/enemies', async (req, res) => {
  try {
    console.log('\n=== Enemies Request ===');
    console.log('Fetching enemies for world:', req.params.worldId);
    
    // Get all encounters for the world
    const encounters = await prisma.encounter.findMany({
      where: {
        worldId: req.params.worldId
      }
    });

    // Transform encounters to get a flat list of enemies
    const enemies = encounters.flatMap(encounter => {
      const enemiesData = typeof encounter.enemies === 'string' 
        ? JSON.parse(encounter.enemies) 
        : encounter.enemies;

      const location = typeof encounter.location === 'string'
        ? JSON.parse(encounter.location)
        : encounter.location;

      return enemiesData.map((enemy: any) => ({
        name: enemy.name || 'Unknown Enemy',
        type: enemy.type || 'Unknown Type',
        count: enemy.count || 1,
        cr: enemy.cr,
        abilities: enemy.abilities || [],
        alignment: enemy.alignment,
        source: {
          encounter: encounter.name,
          location: {
            dungeon: location.dungeon || 'Unknown',
            area: location.area || 'Unknown',
            environment: location.environment
          }
        }
      }));
    });

    console.log('Found enemies:', enemies.length);
    res.json(enemies);
  } catch (error) {
    console.error('Error fetching enemies:', error);
    res.status(500).json({ error: 'Failed to fetch enemies' });
  }
});

// Location routes
app.get('/api/worlds/:worldId/locations', async (req, res) => {
  try {
    const locations = await prisma.location.findMany({
      where: {
        worldId: req.params.worldId
      }
    });
    
    // Transform locations to ensure coordinates are properly structured
    const transformedLocations = locations.map(location => {
      // Ensure coordinates are properly formatted
      let coordinates: { x: number; y: number } | undefined = undefined;
      
      if (location.coordinates) {
        // Handle string format (from older data)
        if (typeof location.coordinates === 'string') {
          try {
            const parsed = JSON.parse(location.coordinates);
            if (parsed && typeof parsed === 'object' && 'x' in parsed && 'y' in parsed) {
              coordinates = {
                x: Number(parsed.x),
                y: Number(parsed.y)
              };
            }
          } catch (e) {
            console.error('Failed to parse coordinates string:', location.coordinates);
          }
        }
        // Handle object format
        else if (typeof location.coordinates === 'object' && location.coordinates !== null) {
          const coords = location.coordinates as any;
          if ('x' in coords && 'y' in coords) {
            coordinates = {
              x: Number(coords.x),
              y: Number(coords.y)
            };
          }
        }
      }

      return {
        ...location,
        coordinates
      };
    });
    
    res.json(transformedLocations);
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Failed to fetch locations' });
  }
});

app.post('/api/locations', async (req, res) => {
  try {
    const location = await prisma.location.create({
      data: req.body
    });
    res.status(201).json(location);
  } catch (error) {
    console.error('Error creating location:', error);
    res.status(500).json({ error: 'Failed to create location' });
  }
});

app.patch('/api/locations/:id', async (req, res) => {
  try {
    const location = await prisma.location.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(location);
  } catch (error) {
    console.error('Error updating location:', error);
    res.status(500).json({ error: 'Failed to update location' });
  }
});

app.delete('/api/locations/:id', async (req, res) => {
  try {
    await prisma.location.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting location:', error);
    res.status(500).json({ error: 'Failed to delete location' });
  }
});

// Protected world creation/modification routes
app.post('/api/worlds', authenticateToken, async (req, res) => {
  try {
    const worldData = {
      ...req.body,
      creator: {
        id: req.user!.id,
        username: req.user!.username,
        displayName: req.user!.displayName
      },
      creatorId: req.user!.id,
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      featured: false,
      popularity: 0
    };
    const world = await prisma.world.create({ 
      data: worldData,
      include: {
        createdBy: true
      }
    });
    res.json(world);
  } catch (error) {
    console.error('Failed to create world:', error);
    res.status(500).json({ error: 'Failed to create world' });
  }
});

app.patch('/api/worlds/:id', authenticateToken, checkWorldAccess('editor'), async (req, res) => {
  try {
    const updatedWorld = await prisma.world.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        lastUpdated: new Date().toISOString()
      },
      include: {
        createdBy: true,
        sharedWith: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                username: true,
                displayName: true,
                avatar: true
              }
            }
          }
        }
      }
    });
    res.json(updatedWorld);
  } catch (error) {
    console.error('Failed to update world:', error);
    res.status(500).json({ error: 'Failed to update world' });
  }
});

// World sharing endpoint
app.post('/api/worlds/:id/invite', authenticateToken, checkWorldAccess('editor'), async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role } = req.body;

    if (!['viewer', 'editor'].includes(role)) {
      res.status(400).json({ error: 'Invalid role. Must be either "viewer" or "editor"' });
      return;
    }

    // Find the user by email
    const invitedUser = await prisma.user.findUnique({
      where: { email }
    });

    if (!invitedUser) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Check if the user already has access
    const existingAccess = await prisma.worldAccess.findUnique({
      where: {
        worldId_userId: {
          worldId: id,
          userId: invitedUser.id
        }
      }
    });

    if (existingAccess) {
      // Update existing access if role is different
      if (existingAccess.role !== role) {
        const updatedAccess = await prisma.worldAccess.update({
          where: {
            id: existingAccess.id
          },
          data: {
            role,
            updatedAt: new Date()
          }
        });
        res.json(updatedAccess);
      } else {
        res.status(400).json({ error: 'User already has this access level' });
      }
      return;
    }

    // Create new access
    const worldAccess = await prisma.worldAccess.create({
      data: {
        world: { connect: { id } },
        user: { connect: { id: invitedUser.id } },
        role
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            displayName: true,
            avatar: true
          }
        }
      }
    });

    // TODO: Send email notification to the invited user

    res.json(worldAccess);
  } catch (error) {
    console.error('Failed to invite player:', error);
    res.status(500).json({ error: 'Failed to invite player' });
  }
});

// Update player access
app.patch('/api/worlds/:id/access/:userId', authenticateToken, checkWorldAccess('creator'), async (req, res) => {
  try {
    const { id, userId } = req.params;
    const { role } = req.body;

    if (!['viewer', 'editor'].includes(role)) {
      res.status(400).json({ error: 'Invalid role. Must be either "viewer" or "editor"' });
      return;
    }

    // Check if the access exists
    const existingAccess = await prisma.worldAccess.findUnique({
      where: {
        worldId_userId: {
          worldId: id,
          userId
        }
      }
    });

    if (!existingAccess) {
      res.status(404).json({ error: 'Access not found' });
      return;
    }

    // Update access
    const updatedAccess = await prisma.worldAccess.update({
      where: {
        id: existingAccess.id
      },
      data: {
        role,
        updatedAt: new Date()
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            displayName: true,
            avatar: true
          }
        }
      }
    });

    res.json(updatedAccess);
  } catch (error) {
    console.error('Failed to update player access:', error);
    res.status(500).json({ error: 'Failed to update player access' });
  }
});

// Remove player access
app.delete('/api/worlds/:id/access/:userId', authenticateToken, checkWorldAccess('creator'), async (req, res) => {
  try {
    const { id, userId } = req.params;

    // Check if the access exists
    const existingAccess = await prisma.worldAccess.findUnique({
      where: {
        worldId_userId: {
          worldId: id,
          userId
        }
      }
    });

    if (!existingAccess) {
      res.status(404).json({ error: 'Access not found' });
      return;
    }

    // Delete access
    await prisma.worldAccess.delete({
      where: {
        id: existingAccess.id
      }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Failed to remove player access:', error);
    res.status(500).json({ error: 'Failed to remove player access' });
  }
});

// Admin endpoint to update all worlds' creator
app.post('/api/admin/worlds/update-creator', authenticateToken, async (req, res) => {
  try {
    const { email } = req.body;

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    // Update all worlds to have this user as creator
    await prisma.world.updateMany({
      data: {
        creatorId: user.id,
        creator: {
          id: user.id,
          name: user.displayName || user.username,
          avatar: user.avatar || '/images/avatars/default.jpg'
        }
      }
    });

    res.json({ message: 'Successfully updated all worlds creator' });
  } catch (error) {
    console.error('Failed to update worlds creator:', error);
    res.status(500).json({ error: 'Failed to update worlds creator' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 