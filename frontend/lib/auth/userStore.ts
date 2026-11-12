import "server-only";
import fs from "fs";
import path from "path";
import crypto from "crypto";
import type { Role } from "./roles";

export type StoredUser = {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  salt: string;
  role: Role;
  status: "active" | "invited";
  resetToken?: string;
  resetTokenExpires?: number;
  createdAt: string;
  lastLoginAt?: string;
};

const USERS_FILE_PATH = path.join(process.cwd(), "data", "admin-users.json");

/** Hash password with salt using PBKDF2 */
export function hashPassword(password: string, salt: string): string {
  return crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
}

/** Generate a random cryptographic salt */
export function generateSalt(): string {
  return crypto.randomBytes(16).toString("hex");
}

/** Default initial users initialized on first run */
function getDefaultUsers(): StoredUser[] {
  const purvaSalt = generateSalt();

  return [
    {
      id: "usr-drpurva",
      name: "Dr. Purva",
      email: "purvaoceanadventures@gmail.com",
      salt: purvaSalt,
      passwordHash: hashPassword("PurvaOcean@2025", purvaSalt),
      role: "owner",
      status: "active",
      createdAt: new Date().toISOString(),
    },
    {
      id: "usr-editor",
      name: "Content Editor",
      email: "editor@purvaoceanadventures.com",
      salt: generateSalt(),
      passwordHash: hashPassword("PurvaOcean@2025", generateSalt()),
      role: "editor",
      status: "active",
      createdAt: new Date().toISOString(),
    },
  ];
}

/** Read all admin users from persistent storage */
export function getStoredUsers(): StoredUser[] {
  try {
    if (fs.existsSync(USERS_FILE_PATH)) {
      const content = fs.readFileSync(USERS_FILE_PATH, "utf-8");
      return JSON.parse(content) as StoredUser[];
    }
  } catch (err) {
    console.error("Failed to read admin users file:", err);
  }

  // File does not exist yet: initialize defaults and save
  const defaults = getDefaultUsers();
  saveStoredUsers(defaults);
  return defaults;
}

/** Save users back to file */
export function saveStoredUsers(users: StoredUser[]): void {
  try {
    const dir = path.dirname(USERS_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(USERS_FILE_PATH, JSON.stringify(users, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save admin users:", err);
  }
}

/** Verify user credentials during sign in */
export function verifyUserCredentials(email: string, password: string): StoredUser | null {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!user) return null;

  const inputHash = hashPassword(password, user.salt);
  if (inputHash !== user.passwordHash) {
    return null;
  }

  // Record login timestamp
  user.lastLoginAt = new Date().toISOString();
  saveStoredUsers(users);

  return user;
}

/** Update user password */
export function updateUserPassword(userId: string, newPassword: string): boolean {
  const users = getStoredUsers();
  const user = users.find((u) => u.id === userId);
  if (!user) return false;

  const newSalt = generateSalt();
  user.salt = newSalt;
  user.passwordHash = hashPassword(newPassword, newSalt);
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;

  saveStoredUsers(users);
  return true;
}

/** Create password reset token for forgot-password flow */
export function createPasswordResetToken(email: string): { user: StoredUser; token: string } | null {
  const users = getStoredUsers();
  const normalizedEmail = email.trim().toLowerCase();
  const user = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (!user) return null;

  // 6-digit alphanumeric reset code
  const token = crypto.randomBytes(3).toString("hex").toUpperCase();
  user.resetToken = token;
  // 1-hour expiration
  user.resetTokenExpires = Date.now() + 60 * 60 * 1000;

  saveStoredUsers(users);
  return { user, token };
}

/** Verify reset token and set new password */
export function resetPasswordWithToken(token: string, newPassword: string): boolean {
  const users = getStoredUsers();
  const normalizedToken = token.trim().toUpperCase();

  const user = users.find(
    (u) => u.resetToken === normalizedToken && u.resetTokenExpires && u.resetTokenExpires > Date.now()
  );

  if (!user) return false;

  const newSalt = generateSalt();
  user.salt = newSalt;
  user.passwordHash = hashPassword(newPassword, newSalt);
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;

  saveStoredUsers(users);
  return true;
}

