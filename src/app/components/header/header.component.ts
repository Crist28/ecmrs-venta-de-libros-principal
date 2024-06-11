import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements AfterViewInit {
  list!: NodeListOf<Element>;
  indicador!: HTMLElement;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.list = this.elementRef.nativeElement.querySelectorAll('.list');
    this.indicador = this.elementRef.nativeElement.querySelector('.indicador');

    // Convierte NodeList en Array para poder usar forEach
    Array.from(this.list).forEach((element, index) => {
      element.addEventListener('click', () => this.activeLink(element, index));
    });
  }

  activeLink(clickedElement: Element, index: number) {
    Array.from(this.list).forEach(element => {
      element.classList.remove('active');
    });
    clickedElement.classList.add('active');

    // Mover el indicador
    const translateX = `calc(70px * ${index})`;
    this.renderer.setStyle(this.indicador, 'transform', `translateX(${translateX})`);
  }
}
