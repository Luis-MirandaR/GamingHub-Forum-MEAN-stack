import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnInit {
  profileImage: string = 'assets/profile.jpg';
  username: string = 'Usuario';
  role: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        this.profileImage = user.imageUrl || 'assets/profile.jpg';
        this.username = user.username || 'Usuario';
        this.role = user.role || '';
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
        this.profileImage = 'assets/profile.jpg';
        this.username = 'Usuario';
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}