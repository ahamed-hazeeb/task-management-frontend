export interface Team {
    id: number;
    name: string;
    description?: string;
    createdAt: string;
    memberCount: number;
}

export interface TeamDetail extends Team {
    members: TeamMember[];
}

export interface TeamMember {
    id: number;
    userId: number;
    userName: string;
    userEmail: string;
    role: TeamMemberRole;
    joinedAt: string;
}

export enum TeamMemberRole {
    Owner = 1,
    Manager = 2,
    Member = 3
}

export interface CreateTeamRequest {
    name: string;
    description?: string;
}