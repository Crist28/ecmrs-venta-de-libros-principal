import { Component } from '@angular/core';
import { NgForm, FormsModule, } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { Router, RouterLink } from '@angular/router';
declare let iziToast: any;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  passwordFieldType: string = "password";
  public cliente: any = {};
  public usuario: any | null = null;
  public token :  string

  constructor(private clienteService: ClienteService, private router: Router) {
    const token = this.clienteService.getToken();
    this.token = token !== null ? token: '';
  }

  login(loginForm: NgForm) {
    if (loginForm.valid) {
      let data = {
        email: this.cliente.email,
        password: this.cliente.password,
      };
      this.clienteService.login_cliente(data).subscribe(
        (response) => {
          if (response.data == undefined) {
            iziToast.error({
              title: 'Error',
              position: 'topRight',
              message: 'Usuario no encontrado',
            });
          }else {
            console.log(response);
          this.usuario = response.data

          localStorage.setItem("token", response.token)
          localStorage.setItem("id", response.data._id)
          localStorage.setItem("nombre", response.data.name)
          this.router.navigate([''])
          }

        }        
      );
    } else {
      iziToast.error({
        title: 'Error',
        position: 'topRight',
        message: 'Todos los campos requeridos deben estar completos.',
      });
    }
  }

  showPassword(event:any) {
    const inputElement = event.target as HTMLInputElement;
    console.log('Checkbox changed:', inputElement.checked);
    this.passwordFieldType = event.target.checked ? 'text' : 'password';
  }
}
