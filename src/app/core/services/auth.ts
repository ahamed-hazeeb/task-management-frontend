import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment.development';
import { AuthResponse, LoginRequest, RegisterRequest, User } from '../models/user.model';
import { StorageService } from './storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(
    private http: HttpClient,
    private storage: StorageService,
    private router: Router
  ) {
    // Initialize after injected services are available
    this.currentUserSubject = new BehaviorSubject<User | null>(this.storage.getUser());
    this.currentUser$ = this.currentUserSubject.asObservable();
  }
  register(request: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, request)
      .pipe(tap(response => this.handleAuthResponse(response)));
  }

  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, request)
      .pipe(tap(response => this.handleAuthResponse(response)));
  }

  logout(): void {
    this.storage.clear();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return !!this.storage.getToken();
  }

  private handleAuthResponse(response: AuthResponse): void {
    this.storage.setToken(response.token);
    const user: User = {
      id: response.userId,
      email: response.email,
      fullName: response.fullName,
      role: response.role
    };
    this.storage.setUser(user);
    this.currentUserSubject.next(user);
  }

  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
}