import {
  Component,
  AfterViewInit,
  ElementRef,
  Renderer2,
  HostListener,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ClienteService } from '../../services/cliente.service';
import Swal from 'sweetalert2';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'], // Cambié `styleUrl` por `styleUrls`
})
export class SearchComponent implements AfterViewInit {
  public nombre: string = '';
  public token: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private clienteService: ClienteService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object, // Inyectar el ID de la plataforma
  ) {
    const token = this.clienteService.getToken();
    this.token = token !== null ? token : '';
  }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      this.nombre = localStorage.getItem('nombre') || '';
    }
  }

  ngAfterViewInit() {
    const searchInput =
      this.elementRef.nativeElement.querySelector('#searchInput');
    const searchIcon =
      this.elementRef.nativeElement.querySelector('#searchIcon');

    this.renderer.listen(searchIcon, 'click', (event: Event) =>
      this.toggleSearch(event, searchInput),
    );
  }

  toggleSearch(event: Event, searchInput: HTMLElement) {
    event.preventDefault();
    if (searchInput.classList.contains('active')) {
      this.renderer.removeClass(searchInput, 'active');
    } else {
      this.renderer.addClass(searchInput, 'active');
      searchInput.focus();
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const searchInput =
      this.elementRef.nativeElement.querySelector('#searchInput');
    const searchIcon =
      this.elementRef.nativeElement.querySelector('#searchIcon');

    if (
      !searchIcon.contains(event.target) &&
      !searchInput.contains(event.target)
    ) {
      this.renderer.removeClass(searchInput, 'active');
    }
  }

  cerrar_sesion() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('nombre');
        this.router.navigate(['']).then(() => {
          window.location.reload();
        });
      }
    });
  }
}
