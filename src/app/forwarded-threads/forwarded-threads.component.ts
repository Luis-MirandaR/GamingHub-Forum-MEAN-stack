import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forwarded-threads',
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
  templateUrl: './forwarded-threads.component.html',
  styleUrl: './forwarded-threads.component.css'
})
export class ForwardedThreadsComponent {
  forwardedThreads: any[] = [];
  games: any[] = [];
  categories: any[] = [];
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>(`${this.apiUrl}/games`).subscribe(data => this.games = data);
    this.http.get<any[]>(`${this.apiUrl}/categories`).subscribe(data => this.categories = data);
    const token = localStorage.getItem('token');
    this.http.get<any[]>(`${this.apiUrl}/forwardedthreads/user`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.forwardedThreads = data,
      error: () => this.forwardedThreads = []
    });
  }

  getGameName(id: string): string {
    const game = this.games.find(g => g._id === id);
    return game ? game.name : id;
  }

  getCategoryName(id: string): string {
    const cat = this.categories.find(c => c._id === id);
    return cat ? cat.category : id;
  }
}
