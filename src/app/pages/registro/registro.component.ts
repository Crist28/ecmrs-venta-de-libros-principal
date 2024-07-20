import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import { NgFor } from '@angular/common';
import { Country } from '../../models/Country';
import { ClienteService } from '../../services/cliente.service';
import { country } from '../../interfaces/paises';
import { Router, RouterLink } from '@angular/router';

declare let iziToast: any;

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, FormsModule,RouterLink],

  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  public cliente: any = {};

  public registerForm: FormGroup;

  constructor(private clienteService: ClienteService, private router: Router) {
      this.registerForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      direction: new FormControl(''),
      phone: new FormControl(''),
      country: new FormControl(''),
      profile: new FormControl(''),
    });
  }

  paises = country;

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log(formData);
      this.clienteService.registro_cliente(formData).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['login']);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Todos los campos requeridos deben estar completos.',
      });

      // Opcional: marcar los campos no válidos como tocados para mostrar errores
      this.registerForm.markAllAsTouched();
    }
  }
}
