import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Define the interface for login statistics
interface LoginStats {
  loginCount: number;
  lastLogin: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private loggedIn = false;

  constructor(private http: HttpClient) { }

  signup(user: any): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?email=${email}&password=${password}`).pipe(
      tap(users => {
        if (users && Array.isArray(users) && users.length > 0) {
          let stats = this.getLoginStats();
          stats.loginCount++;
          stats.lastLogin = new Date().toISOString();
          localStorage.setItem('loginStats', JSON.stringify(stats));
        }
      })
    );
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    return this.loggedIn || !!localStorage.getItem('currentUser');
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn = value;
  }

  getLoginStats(): LoginStats {
    const stats = localStorage.getItem('loginStats');
    if (stats) {
      try {
        const parsed = JSON.parse(stats);
        if (typeof parsed.loginCount === 'number' &&
          (typeof parsed.lastLogin === 'string' || parsed.lastLogin === null)) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse login stats:', e);
      }
    }
    return { loginCount: 0, lastLogin: null };
  }
}
