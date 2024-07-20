import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';

import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', component: InicioComponent },

    
    {
        path: 'registro',  /*CREAMOS UN OBJETO path,*/
        component: RegistroComponent, /* componente que quiero MOSTRAR*/
    },

    {
        path: 'login',  /*CREAMOS UN OBJETO path,*/
        component: LoginComponent, /* componente que quiero MOSTRAR*/
    }

    
];
