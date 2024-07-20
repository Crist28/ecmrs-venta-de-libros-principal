import { Component, AfterViewInit, ElementRef, Renderer2, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements AfterViewInit {
  public nombre: string = '';
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if(typeof localStorage !== 'undefined'){
      this.nombre = localStorage.getItem('nombre') || "";
    }
  }

  ngAfterViewInit() {
    const searchInput = this.elementRef.nativeElement.querySelector('#searchInput');
    const searchIcon = this.elementRef.nativeElement.querySelector('#searchIcon');

    this.renderer.listen(searchIcon, 'click', (event: Event) => this.toggleSearch(event, searchInput));
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
    const searchInput = this.elementRef.nativeElement.querySelector('#searchInput');
    const searchIcon = this.elementRef.nativeElement.querySelector('#searchIcon');
    
    if (!searchIcon.contains(event.target) && !searchInput.contains(event.target)) {
      this.renderer.removeClass(searchInput, 'active');
    }
  }
}
