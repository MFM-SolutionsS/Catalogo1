import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="breadcrumbs" aria-label="Migas de pan">
      <a routerLink="/">Inicio</a>
      <span>/</span>
      <span>Carrito</span>
    </nav>

    <header class="page-header catalog-header">
      <div>
        <p class="eyebrow">Compra</p>
        <h2>Tu carrito</h2>
        <p>Revisa los modelos elegidos antes de finalizar la compra.</p>
      </div>
      <aside class="cart-summary">
        <span>{{ cart.count() }} items</span>
        <strong>{{ formatPrice(cart.total()) }}</strong>
      </aside>
    </header>

    @if (cart.items().length > 0) {
      <section class="cart-view">
        <div class="cart-view-list">
          @for (item of cart.items(); track item.id) {
            <article class="cart-view-item">
              <img [src]="item.image" [alt]="item.name">
              <div>
                <span>{{ item.scale }} · {{ item.rarity }}</span>
                <h3>{{ item.name }}</h3>
                <p>{{ item.color }} · {{ item.sku }}</p>
              </div>
              <strong>{{ item.quantity }} x {{ formatPrice(item.price) }}</strong>
              <button type="button" class="icon-button trash-button" (click)="cart.remove(item.id)" aria-label="Quitar item del carrito">
                <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17">
                  <path d="M9 3h6l1 2h4v2H4V5h4l1-2Zm-2 6h10l-.7 11H7.7L7 9Zm3 2v7h2v-7h-2Zm4 0v7h2v-7h-2Z" fill="currentColor" />
                </svg>
              </button>
            </article>
          }
        </div>

        <aside class="cart-checkout">
          <span>Total</span>
          <strong>{{ formatPrice(cart.total()) }}</strong>
          <button type="button" class="checkout-button">Finalizar compra</button>
          <button type="button" class="link-button" (click)="cart.clear()">Vaciar carrito</button>
          <a routerLink="/products">Seguir comprando</a>
        </aside>
      </section>
    } @else {
      <section class="empty-cart-view">
        <h3>Tu carrito esta vacio</h3>
        <p>Agrega autos desde el catalogo para verlos aca.</p>
        <a routerLink="/products">Ir al catalogo</a>
      </section>
    }
  `,
  styles: []
})
export class CartComponent {
  cart = inject(CartService);

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  }
}
