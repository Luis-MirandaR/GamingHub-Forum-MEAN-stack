import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  threads: any[] = [];
  games: any[] = [];
  categories: any[] = [];
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>(`${this.apiUrl}/games`).subscribe(data => this.games = data);
    this.http.get<any[]>(`${this.apiUrl}/categories`).subscribe(data => this.categories = data);
    this.http.get<any[]>('http://localhost:3000/api/threads').subscribe({
      next: (data) => this.threads = data,
      error: () => this.threads = []
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