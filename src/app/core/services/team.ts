import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Team, TeamDetail, CreateTeamRequest, TeamMemberRole } from '../models/team.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  private apiUrl = `${environment.apiUrl}/teams`;

  constructor(private http: HttpClient) { }

  getMyTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/my-teams`);
  }

  getTeamById(teamId: number): Observable<TeamDetail> {
    return this.http.get<TeamDetail>(`${this.apiUrl}/${teamId}`);
  }

  createTeam(request: CreateTeamRequest): Observable<Team> {
    return this.http.post<Team>(this.apiUrl, request);
  }

  updateTeam(teamId: number, request: CreateTeamRequest): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${teamId}`, request);
  }

  deleteTeam(teamId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${teamId}`);
  }

  addMember(teamId: number, userId: number, role: TeamMemberRole): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${teamId}/members`, { userId, role });
  }

  removeMember(teamId: number, userId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${teamId}/members/${userId}`);
  }

  leaveTeam(teamId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${teamId}/leave`, {});
  }
}