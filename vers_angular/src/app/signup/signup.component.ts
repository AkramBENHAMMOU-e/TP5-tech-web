import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [FormsModule],
  standalone : true,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  user = { name: '', email: '', password: '' };
  constructor(private authService: AuthService, private router: Router) { }
  onSubmit(): void {
    this.authService.signup(this.user).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => console.error(err)
    });
  }
  toggleForm(): void {
    this.router.navigate(['/login']);
  }
}
