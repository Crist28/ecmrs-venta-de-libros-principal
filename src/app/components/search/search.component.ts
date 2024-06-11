import { Component, AfterViewInit, ElementRef, Renderer2, HostListener } from '@angular/core';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements AfterViewInit {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

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
