import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-games',
  imports: [CommonModule, FormsModule, RouterModule, SidebarComponent],
  standalone: true,
  templateUrl: './games.component.html',
  styleUrl: './games.component.css'
})
export class GamesComponent implements OnInit {
  games: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadGames();
  }

  loadGames() {
    this.http.get<any[]>('http://localhost:3000/api/games').subscribe({
      next: (data) => this.games = data,
      error: () => this.games = []
    });
  }

  openAddGameModal() {
    Swal.fire({
      title: 'Agregar juego',
      html:
        `<input id="swal-input1" class="swal2-input" placeholder="Nombre del juego">` +
        `<input id="swal-input2" class="swal2-input" placeholder="Slug">` +
        `<input id="swal-input3" class="swal2-input" placeholder="URL de la imagen">`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      preConfirm: () => {
        const name = (document.getElementById('swal-input1') as HTMLInputElement).value.trim();
        const slug = (document.getElementById('swal-input2') as HTMLInputElement).value.trim();
        const imageUrl = (document.getElementById('swal-input3') as HTMLInputElement).value.trim();
        if (!name || !slug || !imageUrl) {
          Swal.showValidationMessage('Todos los campos son obligatorios');
          return false;
        }
        return { name, slug, imageUrl };
      }
    }).then((result) => {
      if (result.isConfirmed && result.value) {
        this.http.post('http://localhost:3000/api/create-game', result.value).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: '¡Juego agregado!',
              text: 'El juego se guardó correctamente.',
              confirmButtonColor: '#7c3aed'
            });
            this.loadGames();
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err?.error?.message || 'Hubo un error al guardar el juego.',
              confirmButtonColor: '#e11d48'
            });
          }
        });
      }
    });
  }

  deleteGame(id: string) {
  Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el juego de forma permanente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e11d48',
    cancelButtonColor: '#7c3aed',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      this.http.delete(`http://localhost:3000/api/games/${id}`).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El juego fue eliminado correctamente.',
            confirmButtonColor: '#7c3aed'
          });
          this.loadGames();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err?.error?.message || 'No se pudo eliminar el juego.',
            confirmButtonColor: '#e11d48'
          });
        }
      });
    }
  });
}

editGame(game: any) {
  Swal.fire({
    title: 'Editar juego',
    html:
      `<input id="swal-input1" class="swal2-input" placeholder="Nombre del juego" value="${game.name}">` +
      `<input id="swal-input2" class="swal2-input" placeholder="Slug" value="${game.slug}">` +
      `<input id="swal-input3" class="swal2-input" placeholder="URL de la imagen" value="${game.imageUrl}">`,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    preConfirm: () => {
      const name = (document.getElementById('swal-input1') as HTMLInputElement).value.trim();
      const slug = (document.getElementById('swal-input2') as HTMLInputElement).value.trim();
      const imageUrl = (document.getElementById('swal-input3') as HTMLInputElement).value.trim();
      if (!name || !slug || !imageUrl) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
        return false;
      }
      return { name, slug, imageUrl };
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      this.http.put(`http://localhost:3000/api/games/${game._id}`, result.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Juego actualizado!',
            text: 'El juego se actualizó correctamente.',
            confirmButtonColor: '#7c3aed'
          });
          this.loadGames();
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: err?.error?.message || 'Hubo un error al actualizar el juego.',
            confirmButtonColor: '#e11d48'
          });
        }
      });
    }
  });
}
}