import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, SidebarComponent],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  username: string = '';
  profileImageUrl: string = '';

  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        user.id = user._id; // Asegura que el ID sea accesible
        this.profileImageUrl = user.imageUrl || 'assets/profile.jpg';
        this.username = user.username || '';
      },
      error: (err) => {
        console.error('Error al obtener usuario:', err);
        this.profileImageUrl = 'assets/profile.jpg';
        this.username = '';
      }
    });
  }

  saveProfile() {
    const updatedUser = {
      username: this.username,
      imageUrl: this.profileImageUrl
    };

    this.authService.updateProfile(updatedUser).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Perfil actualizado!',
          text: 'Tus cambios se guardaron correctamente.',
          confirmButtonColor: '#7c3aed'
        });
      },
      error: (err) => {
        console.error('Error al actualizar perfil:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al actualizar el perfil.',
          confirmButtonColor: '#e11d48'
        });
      }
    });
  }

  changePassword() {
    if (this.newPassword.length < 8) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'La nueva contraseña debe tener al menos 8 caracteres.',
        confirmButtonColor: '#e11d48'
      });
      return;
    }

    if (this.newPassword !== this.confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Las contraseñas nuevas no coinciden.',
        confirmButtonColor: '#e11d48'
      });
      return;
    }

    this.authService.changePassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Contraseña cambiada!',
          text: 'Tu contraseña se actualizó correctamente.',
          confirmButtonColor: '#7c3aed'
        });
        // Limpia los campos
        this.currentPassword = '';
        this.newPassword = '';
        this.confirmPassword = '';
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err?.error?.message || 'Hubo un error al cambiar la contraseña.',
          confirmButtonColor: '#e11d48'
        });
      }
    });
  }
}