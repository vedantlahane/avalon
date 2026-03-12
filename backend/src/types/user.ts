export interface User {
    id: string;
    email: string;
    name: string | null;
    company: string | null;
    role: string | null;
    teamSize: string | null;
    isOnboarded: boolean | null;
    createdAt: Date;
}

export interface UserIdentity {
    id: string;
    userId: string;
    provider: string;
    providerId: string;
    metadata: Record<string, any> | null;
    createdAt: Date;
    updatedAt: Date;
}
