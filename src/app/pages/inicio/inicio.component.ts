import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [HeaderComponent, SearchComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
