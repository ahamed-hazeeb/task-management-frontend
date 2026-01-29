export interface Task {
    id: number;
    title: string;
    description?: string;
    status: TaskState;
    priority: TaskPriority;
    dueDate?: string;
    assignedToUserId?: number;
    assignedToUserName?: string;
    projectId: number;
    projectName: string;
    createdAt: string;
    completedAt?: string;
}

export enum TaskState {
    Todo = 1,
    InProgress = 2,
    InReview = 3,
    Done = 4
}

export enum TaskPriority {
    Low = 1,
    Medium = 2,
    High = 3,
    Urgent = 4
}

export interface CreateTaskRequest {
    title: string;
    description?: string;
    priority: TaskPriority;
    dueDate?: string;
    assignedToUserId?: number;
}