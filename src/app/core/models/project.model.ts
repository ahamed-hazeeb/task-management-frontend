export interface Project {
    id: number;
    name: string;
    description?: string;
    teamId: number;
    teamName: string;
    createdAt: string;
    deadline?: string;
    taskCount: number;
}

export interface CreateProjectRequest {
    name: string;
    description?: string;
    deadline?: string;
}
export interface ProjectDetail extends Project {
    createdAt: string;
    updatedAt: string;
    taskCount: number;           // total number of tasks
    tasks?: Task[];              // optional list of associated tasks
}