import { Component, AfterViewInit, ElementRef, Renderer2, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements AfterViewInit {
  list!: NodeListOf<Element>;
  indicador!: HTMLElement | null;

  constructor(
    private elementRef: ElementRef, 
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object // Inyectar el ID de la plataforma
  ) {}

  ngAfterViewInit() {
    // Asegúrate de que estamos en el navegador antes de manipular el DOM
    if (isPlatformBrowser(this.platformId)) {
      this.list = this.elementRef.nativeElement.querySelectorAll('.list');
      this.indicador = this.elementRef.nativeElement.querySelector('.indicador');

      if (this.list.length > 0 && this.indicador) {
        // Convierte NodeList en Array para poder usar forEach
        Array.from(this.list).forEach((element, index) => {
          // Usa Renderer2 para agregar el evento de clic
          this.renderer.listen(element, 'click', () => this.activeLink(element, index));
        });
      } else {
        console.error('Elementos con clase .list o .indicador no encontrados en el DOM');
      }
    }
  }

  activeLink(clickedElement: Element, index: number) {
    if (this.list.length > 0) {
      Array.from(this.list).forEach(element => {
        this.renderer.removeClass(element, 'active');
      });
    }

    this.renderer.addClass(clickedElement, 'active');

    if (this.indicador) {
      const translateX = `calc(70px * ${index})`;
      this.renderer.setStyle(this.indicador, 'transform', `translateX(${translateX})`);
    }
  }
}
