import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { isPlatformBrowser } from '@angular/common';

// Interfaces
interface LoginStats {
  loginCount: number;
  lastLogin: string | null;
}

interface User {
  name: string;
  // Add other properties as needed
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, HeaderComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user: User = { name: '' };
  loginStats: LoginStats = { loginCount: 0, lastLogin: null };

  constructor(
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        this.user = JSON.parse(userData) as User;
      }
    }

    this.loginStats = this.authService.getLoginStats();
  }

  formatDate(dateString: string | null): string {
    if (!dateString) return 'Jamais connecté';
    const date = new Date(dateString);
    return date.toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
}