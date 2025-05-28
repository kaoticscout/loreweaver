import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  displayName?: string | null;
  avatar?: string | null;
  bio?: string | null;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date | null;
  isActive: boolean;
  preferences?: any | null;
}

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
      token?: string;
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    const user = await AuthService.validateToken(token);
    if (!user) {
      res.status(401).json({ error: 'Invalid or expired token' });
      return;
    }

    // Attach user and token to request
    const { password, ...userWithoutPassword } = user;
    req.user = userWithoutPassword;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

export const requireRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ error: 'Authentication required' });
      return;
    }

    if (!roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }

    next();
  };
};

export const checkWorldAccess = (requiredRole: 'viewer' | 'editor' | 'creator') => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      if (!req.user) {
        res.status(401).json({ error: 'Authentication required' });
        return;
      }

      const worldId = req.params.id;
      if (!worldId) {
        res.status(400).json({ error: 'World ID is required' });
        return;
      }

      // Get the world and its access information
      const world = await prisma.world.findUnique({
        where: { id: worldId },
        include: {
          createdBy: true,
          sharedWith: {
            where: { userId: req.user.id },
            include: { user: true }
          }
        }
      });

      if (!world) {
        res.status(404).json({ error: 'World not found' });
        return;
      }

      // Check if user is the creator
      if (world.creatorId === req.user.id) {
        next();
        return;
      }

      // If creator access is required, deny access
      if (requiredRole === 'creator') {
        res.status(403).json({ error: 'Only the creator can perform this action' });
        return;
      }

      // Check shared access
      const access = world.sharedWith[0];
      if (!access) {
        res.status(403).json({ error: 'You do not have access to this world' });
        return;
      }

      // For editor role requirement, check if user has editor access
      if (requiredRole === 'editor' && access.role !== 'editor') {
        res.status(403).json({ error: 'Editor access required' });
        return;
      }

      next();
    } catch (error) {
      console.error('Failed to check world access:', error);
      res.status(500).json({ error: 'Failed to check world access' });
    }
  };
}; 