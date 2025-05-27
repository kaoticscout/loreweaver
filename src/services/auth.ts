import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'; // TODO: Move to env
const SALT_ROUNDS = 10;

interface User {
  id: string;
  email: string;
  username: string;
  password: string;
  displayName: string | null;
  avatar: string | null;
  bio: string | null;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt: Date | null;
  isActive: boolean;
  preferences: any | null;
}

type UserWithoutPassword = Omit<User, 'password'>;

export interface AuthResponse {
  user: UserWithoutPassword;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  // No additional fields required
}

export class AuthService {
  static async register(data: RegisterData): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: { email: data.email }
    });

    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Generate username from email
    let username = data.email.split('@')[0];
    let counter = 1;
    
    // Keep trying until we find a unique username
    while (true) {
      const existingUsername = await prisma.user.findUnique({
        where: { username: counter === 1 ? username : `${username}${counter}` }
      });
      
      if (!existingUsername) {
        username = counter === 1 ? username : `${username}${counter}`;
        break;
      }
      counter++;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: data.email,
        username,
        password: hashedPassword,
        displayName: username,
      }
    }) as User;

    // Generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Find user
    const user = await prisma.user.findUnique({
      where: { email: credentials.email }
    }) as User | null;

    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(credentials.password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLoginAt: new Date() }
    });

    // Generate token
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    const { password, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  static async validateToken(token: string): Promise<User | null> {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId }
      }) as User | null;
      return user;
    } catch (error) {
      return null;
    }
  }

  static async getUser(userId: string): Promise<UserWithoutPassword | null> {
    const user = await prisma.user.findUnique({
      where: { id: userId }
    }) as User | null;

    if (!user) {
      return null;
    }

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  static async updateUser(
    userId: string,
    data: Partial<Pick<User, 'displayName' | 'avatar' | 'bio' | 'preferences'>>
  ): Promise<UserWithoutPassword> {
    const user = await prisma.user.update({
      where: { id: userId },
      data
    }) as User;

    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
} 