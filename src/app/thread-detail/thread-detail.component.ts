import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-thread-detail',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule],
  templateUrl: './thread-detail.component.html'
})
export class ThreadDetailComponent implements OnInit {
  thread: any;
  categories: any[] = [];
  games: any[] = [];
  comentarios: any[] = [];
  nuevoComentario: string = '';
  isSubscribed: boolean = false;
  userId = localStorage.getItem('userId');
  userRole = localStorage.getItem('role');

  apiUrl = 'http://localhost:3000/api';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit() {

  const token = localStorage.getItem('token');
  const id = this.route.snapshot.paramMap.get('id');

  if (token) {
    this.http.get<any>(`${this.apiUrl}/forwardedthreads/check/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.isSubscribed = data.subscribed,
      error: () => this.isSubscribed = false
    });
  }

  this.http.get<any>(`${this.apiUrl}/threads/${id}`).subscribe({
    next: (data) => this.thread = data,
    error: () => this.thread = null
  });

  this.http.get<any[]>(`${this.apiUrl}/games`).subscribe({
    next: (data) => this.games = data,
    error: () => this.games = []
  });

  this.http.get<any[]>(`${this.apiUrl}/categories`).subscribe({
    next: (data) => this.categories = data,
    error: () => this.categories = []
  });

  // Cargar comentarios del hilo
  this.http.get<any[]>(`${this.apiUrl}/comments/thread/${id}`).subscribe({
    next: (data) => this.comentarios = data,
    error: () => this.comentarios = []
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

  enviarComentario() {
  if (!this.nuevoComentario.trim()) return;

  const token = localStorage.getItem('token');
  const body = {
    text: this.nuevoComentario,
    threadId: this.thread._id
  };

  this.http.post<any>(`${this.apiUrl}/comments`, body, {
    headers: { Authorization: `Bearer ${token}` }
  }).subscribe({
    next: () => {
      this.nuevoComentario = '';
      location.reload(); // Recarga la página al enviar el comentario
    },
    error: () => {
      alert('Error al enviar el comentario');
    }
  });
  }

  toggleSuscripcion(thread: any) {
  const token = localStorage.getItem('token');
  if (!token) {
    Swal.fire('Atención', 'Debes iniciar sesión.', 'warning');
    return;
  }

  if (this.isSubscribed) {
    // Desuscribirse
    this.http.request<any>(
      'delete',
      `${this.apiUrl}/forwardedthreads`,
      {
        body: { threadId: thread._id },
        headers: { Authorization: `Bearer ${token}` }
      }
    ).subscribe({
      next: () => {
        this.isSubscribed = false;
        Swal.fire('Desuscrito', 'Te has desuscrito del hilo.', 'success');
      },
      error: (err) => {
        Swal.fire('Error', 'Error al desuscribirse del hilo.', 'error');
      }
    });
  } else {
    // Suscribirse
    this.http.post<any>(
      `${this.apiUrl}/forwardedthreads`,
      { threadId: thread._id },
      { headers: { Authorization: `Bearer ${token}` } }
    ).subscribe({
      next: () => {
        this.isSubscribed = true;
        Swal.fire('¡Suscrito!', 'Te has suscrito al hilo.', 'success');
      },
      error: (err) => {
        Swal.fire('Error', 'Error al suscribirse al hilo.', 'error');
      }
    });
  }
  }

  borrarComentario(comentarioId: string) {
  const token = localStorage.getItem('token');
  if (!token) return;
  Swal.fire({
    title: '¿Eliminar comentario?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, borrar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      this.http.delete(`${this.apiUrl}/comments/${comentarioId}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: () => {
          this.comentarios = this.comentarios.filter(c => c._id !== comentarioId);
          Swal.fire('Eliminado', 'Comentario borrado.', 'success');
        },
        error: () => Swal.fire('Error', 'No se pudo borrar el comentario.', 'error')
      });
    }
  });
  }

  borrarHilo(thread: any) {
  const token = localStorage.getItem('token');
  if (!token) return;
  Swal.fire({
    title: '¿Eliminar hilo?',
    text: 'Esta acción no se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, borrar',
    cancelButtonText: 'Cancelar'
  }).then(result => {
    if (result.isConfirmed) {
      this.http.delete(`${this.apiUrl}/threads/${thread._id}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).subscribe({
        next: () => {
          Swal.fire('Eliminado', 'Hilo borrado.', 'success').then(() => {
            // Redirige al dashboard o donde prefieras
            this.router.navigate(['/dashboard']);
          });
        },
        error: () => Swal.fire('Error', 'No se pudo borrar el hilo.', 'error')
      });
    }
  });
}
}