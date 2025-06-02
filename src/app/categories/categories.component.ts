import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule, SidebarComponent],
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {
  newCategory: string = '';
  categories: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {
    this.http.get<any[]>('http://localhost:3000/api/categories').subscribe({
      next: (data) => {
        this.categories = data;
        console.log('Categorías:', this.categories); // <-- Mira la estructura aquí
      },
      error: () => this.categories = []
    });
  }

  addCategory() {
    if (!this.newCategory.trim()) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El nombre de la categoría no puede estar vacío.',
        confirmButtonColor: '#e11d48'
      });
      return;
    }

    this.http.post('http://localhost:3000/api/categories', { category: this.newCategory }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Categoría agregada!',
          text: 'La categoría se guardó correctamente.',
          confirmButtonColor: '#7c3aed'
        });
        this.newCategory = '';
        this.loadCategories(); // Recarga la lista
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err?.error?.message || 'Hubo un error al guardar la categoría.',
          confirmButtonColor: '#e11d48'
        });
      }
    });
  }

  deleteCategory(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción eliminará la categoría de forma permanente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e11d48',
      cancelButtonColor: '#7c3aed',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.delete(`http://localhost:3000/api/categories/${id}`).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Eliminada',
              text: 'La categoría fue eliminada correctamente.',
              confirmButtonColor: '#7c3aed'
            });
            this.loadCategories(); // Recarga la lista
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: err?.error?.message || 'No se pudo eliminar la categoría.',
              confirmButtonColor: '#e11d48'
            });
          }
        });
      }
    });
  }
}