import { PrismaClient, Prisma } from '@prisma/client';
import type { Location } from '../types/location';

const prisma = new PrismaClient();

// Type conversion helpers
const toDBLocation = (location: Location): Prisma.LocationCreateInput => {
  const dbLocation: Prisma.LocationCreateInput = {
    id: location.id,
    name: location.name,
    description: location.description,
    type: location.type,
    coordinates: location.coordinates as unknown as Prisma.InputJsonValue,
    population: location.population ?? null,
  };

  // Optional arrays that might exist on some location types
  if ('primaryRaces' in location) {
    dbLocation.primaryRaces = (location as any).primaryRaces;
  }
  if ('notableFeatures' in location) {
    dbLocation.notableFeatures = (location as any).notableFeatures;
  }
  if ('services' in location) {
    dbLocation.services = (location as any).services;
  }
  if ('localGovernment' in location) {
    dbLocation.localGovernment = (location as any).localGovernment;
  }
  if ('significance' in location) {
    dbLocation.significance = (location as any).significance;
  }
  if ('history' in location) {
    dbLocation.history = (location as any).history;
  }

  return dbLocation;
};

const fromDBLocation = (dbLocation: any): Location => ({
  id: dbLocation.id,
  name: dbLocation.name,
  description: dbLocation.description,
  type: dbLocation.type,
  coordinates: dbLocation.coordinates as { x: number; y: number } | undefined,
  population: dbLocation.population,
  region: dbLocation.region,
  ...(dbLocation.primaryRaces && { primaryRaces: dbLocation.primaryRaces }),
  ...(dbLocation.notableFeatures && { notableFeatures: dbLocation.notableFeatures }),
  ...(dbLocation.services && { services: dbLocation.services }),
  ...(dbLocation.localGovernment && { localGovernment: dbLocation.localGovernment }),
  ...(dbLocation.significance && { significance: dbLocation.significance }),
  ...(dbLocation.history && { history: dbLocation.history }),
});

export const DatabaseService = {
  // Location operations
  async getAllLocations(): Promise<Location[]> {
    const locations = await prisma.location.findMany();
    return locations.map(fromDBLocation);
  },

  async getLocationById(id: string): Promise<Location | null> {
    const location = await prisma.location.findUnique({
      where: { id },
    });
    return location ? fromDBLocation(location) : null;
  },

  async createLocation(location: Location): Promise<Location> {
    const created = await prisma.location.create({
      data: toDBLocation(location),
    });
    return fromDBLocation(created);
  },

  async updateLocation(id: string, location: Partial<Location>): Promise<Location> {
    const updated = await prisma.location.update({
      where: { id },
      data: toDBLocation(location as Location),
    });
    return fromDBLocation(updated);
  },

  async deleteLocation(id: string): Promise<void> {
    await prisma.location.delete({
      where: { id },
    });
  },
}; 