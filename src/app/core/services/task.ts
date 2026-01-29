import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Task, CreateTaskRequest, TaskState, PagedResult } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProjectTasks(projectId: number, page: number = 1, pageSize: number = 10): Observable<PagedResult<Task>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PagedResult<Task>>(`${this.apiUrl}/projects/${projectId}/tasks/paged`, { params });
  }

  getTaskById(projectId: number, taskId: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}`);
  }

  createTask(projectId: number, request: CreateTaskRequest): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/projects/${projectId}/tasks`, request);
  }

  updateTask(projectId: number, taskId: number, request: CreateTaskRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}`, request);
  }

  deleteTask(projectId: number, taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}`);
  }

  updateTaskStatus(projectId: number, taskId: number, status: TaskState): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}/status`, { status });
  }

  assignTask(projectId: number, taskId: number, userId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}/assign`, { userId });
  }

  unassignTask(projectId: number, taskId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/projects/${projectId}/tasks/${taskId}/unassign`, {});
  }
}