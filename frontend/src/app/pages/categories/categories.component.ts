import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogDataService } from '../../services/catalog-data.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="breadcrumbs" aria-label="Migas de pan">
      <a routerLink="/">Inicio</a>
      <span>/</span>
      <span>Series</span>
    </nav>

    <header class="page-header">
      <p class="eyebrow">Series</p>
      <h2>Escalas y categorias</h2>
    </header>

    @if (categories$ | async; as categories) {
      <div class="cards feature-cards">
        @for (c of categories; track c.id) {
          <article class="card">
            <span class="tag">{{ c.slug }}</span>
            <strong>{{ c.name }}</strong>
            <p>{{ c.description }}</p>
          </article>
        }
      </div>
    } @else {
      <p>Cargando...</p>
    }
  `,
  styles: []
})
export class CategoriesComponent {
  private catalog = inject(CatalogDataService);
  categories$ = this.catalog.getCategories();
}
