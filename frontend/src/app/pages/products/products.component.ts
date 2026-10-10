import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CatalogDataService, Product } from '../../services/catalog-data.service';


@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <nav class="breadcrumbs" aria-label="Migas de pan">
      <a routerLink="/">Inicio</a>
      <span>/</span>
      <span>Catalogo</span>
    </nav>

    <header class="page-header catalog-header">
      <div>
        <p class="eyebrow">El Garaje de Pende</p>
        <h2>Autos a escala</h2>
        <p>Modelos coleccionables con imagenes reales, precio en pesos argentinos y compra por carrito.</p>
      </div>

      <a routerLink="/cart" class="cart-summary catalog-cart-link">
        <span>{{ cart.count() }} items en carrito</span>
        <strong>{{ formatPrice(cart.total()) }}</strong>
      </a>
    </header>

    <section class="catalog-banner">
      <img src="assets/cars/Banner-2.png" alt="Banner del catalogo con nuevos autos a escala">
      <div>
        <span>Ingreso destacado</span>
        <strong>McLaren, Chevelle, JDM y modelos premium</strong>
      </div>
    </section>

    @if (loaded) {
      <section class="catalog-search" aria-label="Buscar productos">
        <div>
          <span>Buscar en catalogo</span>
          <strong>{{ filteredProducts.length }} de {{ products.length }} modelos</strong>
        </div>
        <label>
          <span class="visually-hidden">Buscar por nombre, SKU, escala, color o rareza</span>
          <input
            type="search"
            name="catalogSearch"
            [(ngModel)]="searchTerm"
            placeholder="Ej: Supra, 1:43, JDM, rojo..."
            autocomplete="off"
          >
        </label>
        @if (searchTerm) {
          <button type="button" class="ghost" (click)="clearSearch()">Limpiar</button>
        }
      </section>

      <section class="shop-layout products-only">
        @if (filteredProducts.length) {
          <div class="product-grid">
            @for (p of filteredProducts; track p.id) {
              <article class="product-card">
                <img [src]="p.image" [alt]="p.name" loading="lazy">
                <div class="product-info">
                  <div class="product-topline">
                    <span>{{ p.scale }}</span>
                    <span>{{ p.rarity }}</span>
                  </div>
                  <h3>{{ p.name }}</h3>
                  <p>{{ p.color }} · {{ p.sku }} · {{ p.stock }} disponibles</p>
                  <div class="product-meta">
                    <strong>{{ formatPrice(p.price) }}</strong>
                    <div class="product-actions">
                      <a [routerLink]="['/products', p.id]">Ver detalle</a>
                      <button
                        type="button"
                        class="add-button"
                        [class.added]="addedProductId === p.id"
                        (click)="addToCart(p)"
                      >{{ addedProductId === p.id ? 'Agregado' : 'Agregar' }}</button>
                    </div>
                  </div>
                </div>
              </article>
            }
          </div>
        } @else {
          <div class="catalog-empty">
            <strong>No encontramos modelos con esa busqueda.</strong>
            <p>Proba con otra escala, color, SKU o nombre del auto.</p>
            <button type="button" class="ghost" (click)="clearSearch()">Ver todo el catalogo</button>
          </div>
        }
      </section>
    } @else {
      <p>Cargando...</p>
    }
  `,
  styles: []
})
export class ProductsComponent {
  private catalog = inject(CatalogDataService);
  cart = inject(CartService);
  products: Product[] = [];
  searchTerm = '';
  loaded = false;
  addedProductId: number | null = null;
  private addedTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    this.catalog.getProducts().subscribe((products) => {
      this.products = products;
      this.loaded = true;
    });
  }

  get filteredProducts(): Product[] {
    const term = this.normalize(this.searchTerm);

    if (!term) return this.products;

    return this.products.filter((product) => {
      const searchable = this.normalize([
        product.name,
        product.sku,
        product.scale,
        product.color,
        product.rarity,
        product.price.toString()
      ].join(' '));

      return searchable.includes(term);
    });
  }

  addToCart(product: Product): void {
    this.markAsAdded(product.id);
    this.cart.add(product);
  }

  clearSearch(): void {
    this.searchTerm = '';
  }

  private markAsAdded(productId: number): void {
    window.clearTimeout(this.addedTimer);
    this.addedProductId = productId;
    this.addedTimer = setTimeout(() => (this.addedProductId = null), 850);
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  }

  private normalize(value: string): string {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }
}
