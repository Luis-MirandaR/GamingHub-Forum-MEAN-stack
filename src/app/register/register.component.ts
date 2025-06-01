import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, RouterModule],
})
export class RegisterComponent {
    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
        this.registerForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            username: ['', Validators.required]
        });
    }

    onSubmit() {
        if (this.registerForm.valid) {
            const { email, password, username } = this.registerForm.value;
            this.authService.register(email, password, username).subscribe({
                next: () => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Registro exitoso',
                        text: 'Ahora puedes iniciar sesión.'
                    }).then(() => {
                        this.router.navigate(['/login']);
                    });
                },
                error: () => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error al registrar',
                        text: 'Intenta con otro correo.'
                    });
                }
            });
        }
    }
}