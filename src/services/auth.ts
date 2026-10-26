import { AuthSession, User } from '../types';

const STORAGE_USERS_KEY = 'fakenews_registered_users';
const STORAGE_SESSION_KEY = 'fakenews_active_session';

interface StoredUser {
  id: string;
  name: string;
  email: string;
  salt: string;
  passwordHash: string;
  createdAt: string;
}

// Simple cryptographic hash using SHA-256 from Web Crypto API
async function hashPassword(password: string, salt: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(password + salt);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

function generateSalt(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Initialize default demo user in storage
 */
async function initializeUsers(): Promise<StoredUser[]> {
  const existing = localStorage.getItem(STORAGE_USERS_KEY);
  if (existing) {
    try {
      return JSON.parse(existing);
    } catch {
      // fallback
    }
  }

  const defaultSalt = 'fakenews_salt_9821';
  const defaultHash = await hashPassword('demo1234', defaultSalt);

  const initialUsers: StoredUser[] = [
    {
      id: 'usr-default-demo',
      name: 'Dr. Sarah Lin (Verification Analyst)',
      email: 'analyst@fakenewsdetector.org',
      salt: defaultSalt,
      passwordHash: defaultHash,
      createdAt: new Date().toISOString()
    }
  ];

  localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(initialUsers));
  return initialUsers;
}

export const authService = {
  /**
   * Get currently active session if any
   */
  getCurrentSession(): AuthSession | null {
    const data = localStorage.getItem(STORAGE_SESSION_KEY);
    if (!data) return null;
    try {
      return JSON.parse(data) as AuthSession;
    } catch {
      localStorage.removeItem(STORAGE_SESSION_KEY);
      return null;
    }
  },

  /**
   * Register a new user (FR1)
   */
  async register(name: string, email: string, password: string): Promise<{ success: boolean; error?: string; session?: AuthSession }> {
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanName) {
      return { success: false, error: 'Name is required' };
    }
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      return { success: false, error: 'Please enter a valid email address' };
    }
    if (!password || password.length < 6) {
      return { success: false, error: 'Password must be at least 6 characters long' };
    }

    const users = await initializeUsers();
    const existing = users.find(u => u.email === cleanEmail);
    if (existing) {
      return { success: false, error: 'An account with this email already exists. Please Sign In.' };
    }

    const salt = generateSalt();
    const passwordHash = await hashPassword(password, salt);

    const newUser: StoredUser = {
      id: 'usr-' + Date.now() + '-' + Math.random().toString(36).substring(2, 7),
      name: cleanName,
      email: cleanEmail,
      salt,
      passwordHash,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));

    const user: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      createdAt: newUser.createdAt
    };

    const session: AuthSession = {
      token: 'jwt-session-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9),
      user
    };

    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    return { success: true, session };
  },

  /**
   * Authenticate user credentials (FR2)
   */
  async login(email: string, password: string): Promise<{ success: boolean; error?: string; session?: AuthSession }> {
    const cleanEmail = email.trim().toLowerCase();

    if (!cleanEmail) {
      return { success: false, error: 'Email is required' };
    }
    if (!password) {
      return { success: false, error: 'Password is required' };
    }

    const users = await initializeUsers();
    const user = users.find(u => u.email === cleanEmail);

    if (!user) {
      return { success: false, error: 'Invalid email or password. Please check your credentials.' };
    }

    const computedHash = await hashPassword(password, user.salt);
    if (computedHash !== user.passwordHash) {
      return { success: false, error: 'Invalid email or password. Please check your credentials.' };
    }

    const authUser: User = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt
    };

    const session: AuthSession = {
      token: 'jwt-session-' + Date.now() + '-' + Math.random().toString(36).substring(2, 9),
      user: authUser
    };

    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));
    return { success: true, session };
  },

  /**
   * Terminate active session (FR9)
   */
  logout(): void {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  }
};
