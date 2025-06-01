import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 class="text-3xl font-bold mb-4">¡Bienvenido al Dashboard!</h1>
      <p class="mb-8">Has iniciado sesión correctamente.</p>
      <button
        (click)="logout()"
        class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Cerrar sesión
      </button>
    </div>
  `
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}