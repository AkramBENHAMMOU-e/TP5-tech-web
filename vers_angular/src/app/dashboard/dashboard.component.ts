import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Ensure correct path
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from '../header/header.component';

// Import or define LoginStats interface (ideally, move to a shared file)
interface LoginStats {
  loginCount: number;
  lastLogin: string | null;
}

// Define a User interface based on expected structure
interface User {
  name: string;
  // Add other properties as needed (e.g., email, id) based on your API response
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, HeaderComponent],
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Fixed `styleUrl` to `styleUrls` (array)
})
export class DashboardComponent implements OnInit {
  user: User = { name: '' }; // Use User interface instead of any
  loginStats: LoginStats = { loginCount: 0, lastLogin: null }; // Explicitly typed

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login'], { replaceUrl: true });
      return;
    }

    // Retrieve current user information
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      this.user = JSON.parse(userData) as User; // Type assertion for safety
    }

    // Retrieve login statistics
    this.loginStats = this.authService.getLoginStats();
  }

  // Format date for display
  formatDate(dateString: string | null): string {
    if (!dateString) return 'Jamais connectÃ©';

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
