import { db } from "../db";
import { users } from "@shared/models/auth";
import { eq } from "drizzle-orm";

export interface IAuthStorage {
  getUser(userId: string): Promise<any | null>;
  getUserByEmail(email: string): Promise<any | null>;
  upsertUser(user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
    passwordHash?: string;
  }): Promise<void>;
}

class AuthStorage implements IAuthStorage {
  async getUser(userId: string) {
    const result = await db.select().from(users).where(eq(users.id, userId)).limit(1);
    return result[0] || null;
  }

  async getUserByEmail(email: string) {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0] || null;
  }

  async upsertUser(user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    profileImageUrl?: string;
    passwordHash?: string;
  }) {
    await db
      .insert(users)
      .values(user)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          profileImageUrl: user.profileImageUrl,
        },
      });
  }
}

export const authStorage = new AuthStorage();
export type { IAuthStorage };
