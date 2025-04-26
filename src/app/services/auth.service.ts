import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserRegistrationDTO } from '../dto/request/user-registration.dto';
import { environment } from '../../enviroments/environment';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticatedUserDTO } from '../dto/response/authenticated-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API = `${environment.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<AuthenticatedUserDTO | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.API}/login`, { email, password }, { withCredentials: true }).pipe(
      tap(() => this.loadUser())
    );
  }

  register(data: UserRegistrationDTO): Observable<any> {
    return this.http.post(`${this.API}/register`, data, { withCredentials: true });
  }

  logout(): void {
    this.http.post(`${this.API}/logout`, {}, { withCredentials: true }).subscribe({
      next: () => {
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Erro no logout:', err);
        this.currentUserSubject.next(null);
        this.router.navigate(['/']);
      }
    });
  }

  checkAuth(): Observable<{ isAuthenticated: boolean; role: string | null }> {
    return this.http.get<AuthenticatedUserDTO>(`${this.API}/me`, { withCredentials: true }).pipe(
      tap(user => this.currentUserSubject.next(user)),
      map(user => ({
        isAuthenticated: true,
        role: user.role
      })),
      catchError(() => {
        this.currentUserSubject.next(null);
        return of({ isAuthenticated: false, role: null });
      })
    );
  }

  loadUser(): void {
    this.http.get<AuthenticatedUserDTO>(`${this.API}/me`, { withCredentials: true }).subscribe({
      next: user => this.currentUserSubject.next(user),
      error: () => this.currentUserSubject.next(null)
    });
  }

  getCurrentUser(): AuthenticatedUserDTO | null {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
}