import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { CatalogDataService } from '../../services/catalog-data.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    @if (product$ | async; as product) {
      <nav class="breadcrumbs" aria-label="Migas de pan">
        <a routerLink="/">Inicio</a>
        <span>/</span>
        <a routerLink="/products">Catalogo</a>
        <span>/</span>
        <span>{{ product.name }}</span>
      </nav>

      <a routerLink="/products" class="back-link">Volver al catalogo</a>

      <section class="detail-hero">
        <figure class="detail-image">
          <img [src]="product.image" [alt]="product.name">
        </figure>

        <article class="detail-info">
          <p class="eyebrow">{{ product.sku }} · {{ product.scale }}</p>
          <h1>{{ product.name }}</h1>
          <p class="detail-lead">{{ product.color }} · {{ product.rarity }} · {{ product.stock }} unidades disponibles</p>

          <div class="detail-price">{{ formatPrice(product.price) }}</div>

          <div class="detail-actions">
            <button type="button">Agregar al carrito</button>
            <a routerLink="/products">Seguir viendo</a>
          </div>
        </article>
      </section>

      <section class="detail-specs">
        <article>
          <span>Escala</span>
          <strong>{{ product.scale }}</strong>
        </article>
        <article>
          <span>Rareza</span>
          <strong>{{ product.rarity }}</strong>
        </article>
        <article>
          <span>Color</span>
          <strong>{{ product.color }}</strong>
        </article>
        <article>
          <span>Stock</span>
          <strong>{{ product.stock }} uds.</strong>
        </article>
      </section>
    } @else {
      <p>Cargando detalle...</p>
    }
  `,
  styles: []
})
export class ProductDetailComponent {
  private catalog = inject(CatalogDataService);
  private route = inject(ActivatedRoute);

  product$ = this.route.paramMap.pipe(
    switchMap((params) => this.catalog.getProduct(Number(params.get('id'))))
  );

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  }
}
