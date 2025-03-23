import {Component} from '@angular/core';
import {Router, RouterLinkActive} from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-header',
  imports: [
    RouterLinkActive,
  ],
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private authService: AuthService, private router: Router) {

  }
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
