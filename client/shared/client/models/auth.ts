export type User = {
  id: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  profileImageUrl?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
  tier?: "free" | "starter" | "pro" | "lifetime" | null;
  tierSource?: string | null;
  tierExpiresAt?: string | null;
};
