import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Project, ProjectDetail, CreateProjectRequest } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getTeamProjects(teamId: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/teams/${teamId}/projects`);
  }

  getProjectById(teamId: number, projectId: number): Observable<ProjectDetail> {
    return this.http.get<ProjectDetail>(`${this.apiUrl}/teams/${teamId}/projects/${projectId}`);
  }

  createProject(teamId: number, request: CreateProjectRequest): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/teams/${teamId}/projects`, request);
  }

  updateProject(teamId: number, projectId: number, request: CreateProjectRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/teams/${teamId}/projects/${projectId}`, request);
  }

  deleteProject(teamId: number, projectId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/teams/${teamId}/projects/${projectId}`);
  }
}