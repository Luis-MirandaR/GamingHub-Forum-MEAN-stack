import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from 'express';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mythreads',
  standalone: true,
  imports: [SidebarComponent, CommonModule, FormsModule, RouterModule],
  templateUrl: './mythreads.component.html'
})
export class MyThreadsComponent implements OnInit {
  myThreads: any[] = [];
  games: any[] = [];
  categories: any[] = [];
  apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<any[]>(`${this.apiUrl}/games`).subscribe(data => this.games = data);
    this.http.get<any[]>(`${this.apiUrl}/categories`).subscribe(data => this.categories = data);
    this.loadGames();
    this.loadCategories();
    this.loadMyThreads();
  }

  getGameName(id: string): string {
    const game = this.games.find(g => g._id === id);
    return game ? game.name : id;
  }

  getCategoryName(id: string): string {
    const cat = this.categories.find(c => c._id === id);
    return cat ? cat.category : id;
  }

  loadMyThreads() {
    const token = localStorage.getItem('token');
    this.http.get<any[]>(`${this.apiUrl}/mythreads`, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe({
      next: (data) => this.myThreads = data,
      error: () => this.myThreads = []
    });
  }

  loadGames() {
    this.http.get<any[]>(`${this.apiUrl}/games`).subscribe({
      next: (data) => this.games = data,
      error: () => this.games = []
    });
  }

  loadCategories() {
    this.http.get<any[]>(`${this.apiUrl}/categories`).subscribe({
      next: (data) => this.categories = data,
      error: () => this.categories = []
    });
  }

  openCreateThreadModal() {
    if (this.games.length === 0 || this.categories.length === 0) {
      Swal.fire('Cargando', 'Espera a que se carguen los juegos y categorías.', 'info');
      return;
    }

    const gameOptions = this.games.map(game =>
      `<option value="${game._id}">${game.name}</option>`
    ).join('');

    const categoryOptions = this.categories.map(cat =>
      `<option value="${cat._id}">${cat.category}</option>`
    ).join('');

    Swal.fire({
      title: 'Crear nuevo hilo',
      html:
        `<div style="display:flex;flex-direction:column;align-items:center;">` +
        `<input id="swal-titulo" class="swal2-input" placeholder="Título del hilo" style="width:300px;" />` +
        `<textarea id="swal-texto" class="swal2-textarea" placeholder="Contenido del hilo" style="resize: none; width:300px;"></textarea>` +
        `<input id="swal-imagen" class="swal2-input" placeholder="URL de la imagen (opcional)" style="width:300px;" />` +
        `<select id="swal-juego" class="swal2-input mb-2" style="width:300px;">${gameOptions}</select>` +
        `<select id="swal-categorias" class="swal2-input" style="width:300px;">${categoryOptions}</select>` +
        `</div>`,
      focusConfirm: false,
      width: 600,
      showCancelButton: true,
      confirmButtonText: 'Crear',
      preConfirm: () => {
        const titulo = (document.getElementById('swal-titulo') as HTMLInputElement).value.trim();
        const texto = (document.getElementById('swal-texto') as HTMLTextAreaElement).value.trim();
        const imagenUrl = (document.getElementById('swal-imagen') as HTMLInputElement).value.trim();
        const juego = (document.getElementById('swal-juego') as HTMLSelectElement).value;
        const category = (document.getElementById('swal-categorias') as HTMLSelectElement).value;

        if (!titulo || !texto || !juego || !category) {
          Swal.showValidationMessage('Todos los campos (excepto imagen) son obligatorios');
          return false;
        }
        return { titulo, texto, imagenUrl, juego, category };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        const token = localStorage.getItem('token');
        this.http.post(`${this.apiUrl}/threads`, result.value, {
          headers: { Authorization: `Bearer ${token}` }
        }).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Hilo creado!',
              text: 'Tu hilo se ha publicado correctamente.',
              confirmButtonColor: '#7c3aed'
            });
            this.loadMyThreads();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err?.error?.message || 'Hubo un error al crear el hilo.',
              confirmButtonColor: '#e11d48'
            });
          }
        });
      }
    });
  }
}