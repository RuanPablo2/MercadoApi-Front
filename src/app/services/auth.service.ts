import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, switchMap, tap, catchError } from 'rxjs';
import { environment } from '../../enviroments/environment';
import { UserRegistrationDTO } from '../dto/request/user-registration.dto';
import { LoginRequestDTO } from '../dto/request/login.dto';
import { AuthenticatedUserDTO } from '../dto/response/authenticated-user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private apiUrl = `${environment.apiUrl}/auth`;

  private currentUserSubject = new BehaviorSubject<AuthenticatedUserDTO | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.checkInitialSession();
  }

  private checkInitialSession(): void {
    this.http.get<AuthenticatedUserDTO>(`${this.apiUrl}/me`).pipe(
      tap(user => {
        this.currentUserSubject.next(user);
      }),
      catchError(() => {
        this.currentUserSubject.next(null);
        return of(null);
      })
    ).subscribe();
  }

  public getCurrentUserValue(): AuthenticatedUserDTO | null {
    return this.currentUserSubject.getValue();
  }

  login(loginData: LoginRequestDTO): Observable<AuthenticatedUserDTO> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      switchMap(() => this.http.get<AuthenticatedUserDTO>(`${this.apiUrl}/me`)),
      tap(user => {
        this.currentUserSubject.next(user);
      })
    );
  }

  logout(): void {
    this.http.post(`${this.apiUrl}/logout`, {}).pipe(
      catchError(err => {
        console.error("Logout failed", err);
        return of(null);
      })
    ).subscribe(() => {
      this.currentUserSubject.next(null);
      this.router.navigate(['/']);
    });
  }

  register(registrationData: UserRegistrationDTO): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, registrationData);
  }
}
