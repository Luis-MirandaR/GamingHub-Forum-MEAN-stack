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
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.http.get<any[]>(`${this.apiUrl}/forwardedthreads/user`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.forwardedThreads = data,
      error: () => this.forwardedThreads = []
    });
  }
}
