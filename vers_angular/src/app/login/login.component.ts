import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  standalone : true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  credentials = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.credentials.email, this.credentials.password).subscribe({
      next: (users) => {
        if (users.length > 0) {
          this.authService.setLoggedIn(true);
          localStorage.setItem('currentUser', JSON.stringify(users[0]));
          this.router.navigate(['/dashboard']);
        } else {
          alert('Email ou mot de passe incorrect');
        }
      },
      error: (err) => console.error('Erreur connexion', err)
    });
  }
  toggleForm(): void {
    this.router.navigate(['/signup']);
  }

}
