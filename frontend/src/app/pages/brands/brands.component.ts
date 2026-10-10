import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogDataService } from '../../services/catalog-data.service';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="breadcrumbs" aria-label="Migas de pan">
      <a routerLink="/">Inicio</a>
      <span>/</span>
      <span>Marcas</span>
    </nav>

    <header class="page-header">
      <p class="eyebrow">Fabricantes</p>
      <h2>Marcas de coleccion</h2>
    </header>

    @if (brands$ | async; as brands) {
      <div class="cards">
        @for (brand of brands; track brand.id) {
          <article class="card">
            <span class="tag">{{ brand.country }}</span>
            <strong>{{ brand.name }}</strong>
            <p>{{ brand.style }}</p>
          </article>
        }
      </div>
    } @else {
      <p>Cargando...</p>
    }
  `,
  styles: []
})
export class BrandsComponent {
  private catalog = inject(CatalogDataService);
  brands$ = this.catalog.getBrands();
}
