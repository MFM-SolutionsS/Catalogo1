import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CatalogDataService } from '../../services/catalog-data.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <nav class="breadcrumbs" aria-label="Migas de pan">
      <a routerLink="/">Inicio</a>
      <span>/</span>
      <span>Reservas</span>
    </nav>

    <header class="page-header">
      <p class="eyebrow">Ventas</p>
      <h2>Reservas recientes</h2>
    </header>

    @if (orders$ | async; as orders) {
      <table>
        <thead>
          <tr><th>ID</th><th>Cliente</th><th>Estado</th><th>Total</th><th>Autos</th></tr>
        </thead>
        <tbody>
          @for (order of orders; track order.id) {
            <tr><td>#{{ order.id }}</td><td>{{ order.customer }}</td><td><span class="status">{{ order.status }}</span></td><td>{{ formatPrice(order.total) }}</td><td>{{ order.items }}</td></tr>
          }
        </tbody>
      </table>
    } @else {
      <p>Cargando...</p>
    }
  `,
  styles: []
})
export class OrdersComponent {
  private catalog = inject(CatalogDataService);
  orders$ = this.catalog.getOrders();

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  }
}
