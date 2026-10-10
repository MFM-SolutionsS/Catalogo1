import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { Brand, CatalogDataService, Product, Scale } from '../../services/catalog-data.service';

type Tab = 'products' | 'brands' | 'scales';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <nav class="breadcrumbs" aria-label="Migas de pan">
      <a routerLink="/">Inicio</a>
      <span>/</span>
      <span>Administracion</span>
    </nav>

    <header class="page-header admin-hero">
      <div class="admin-hero-copy">
        <p class="eyebrow">Mesa de taller</p>
        <h2>Inventario del garage</h2>
        <p>Alta, edicion y baja de productos, marcas y escalas. En GitHub Pages los cambios se guardan en este navegador.</p>
      </div>

      <div class="admin-metrics" aria-label="Resumen del catalogo">
        <article>
          <span>Productos</span>
          <strong>{{ products.length }}</strong>
        </article>
        <article>
          <span>Stock total</span>
          <strong>{{ totalStock }}</strong>
        </article>
        <article>
          <span>Valor inventario</span>
          <strong>{{ formatPrice(inventoryValue) }}</strong>
        </article>
      </div>
    </header>

    <div class="admin-tabs">
      <button type="button" [class.active]="tab === 'products'" (click)="selectTab('products')">
        Productos <span>{{ products.length }}</span>
      </button>
      <button type="button" [class.active]="tab === 'brands'" (click)="selectTab('brands')">
        Marcas <span>{{ brands.length }}</span>
      </button>
      <button type="button" [class.active]="tab === 'scales'" (click)="selectTab('scales')">
        Escalas <span>{{ scales.length }}</span>
      </button>
    </div>

    @if (message) {
      <p class="admin-message">{{ message }}</p>
    }

    <section class="admin-layout">
      <div class="admin-list">
        <div class="admin-panel-heading">
          <div>
            <span>{{ tabKicker }}</span>
            <h3>{{ tabTitle }}</h3>
          </div>
          <strong>{{ activeCount }} registros</strong>
        </div>

        @if (tab === 'products') {
          @for (p of products; track p.id) {
            <article class="admin-row">
              <img [src]="p.image" [alt]="p.name" class="row-thumb">
              <div class="row-body">
                <strong>{{ p.name }}</strong>
                <span>{{ p.sku }} · {{ p.scale }} · {{ p.rarity }}</span>
                <div class="row-tags">
                  <em>{{ formatPrice(p.price) }}</em>
                  <em [class]="stockClass(p.stock)">{{ stockLabel(p.stock) }}</em>
                </div>
              </div>
              <div class="row-actions">
                <button type="button" class="ghost" (click)="editProduct(p)">Editar</button>
                <button type="button" class="danger" (click)="remove(p.id)">Borrar</button>
              </div>
            </article>
          }
        }

        @if (tab === 'brands') {
          @for (b of brands; track b.id) {
            <article class="admin-row">
              <div class="row-avatar">{{ b.name.charAt(0) }}</div>
              <div class="row-body">
                <strong>{{ b.name }}</strong>
                <span>{{ b.country }} · {{ b.style }}</span>
              </div>
              <div class="row-actions">
                <button type="button" class="ghost" (click)="editBrand(b)">Editar</button>
                <button type="button" class="danger" (click)="remove(b.id)">Borrar</button>
              </div>
            </article>
          }
        }

        @if (tab === 'scales') {
          @for (s of scales; track s.id) {
            <article class="admin-row">
              <div class="row-avatar scale">{{ s.name }}</div>
              <div class="row-body">
                <strong>{{ s.name }}</strong>
                <span>{{ s.description }}</span>
              </div>
              <div class="row-actions">
                <button type="button" class="ghost" (click)="editScale(s)">Editar</button>
                <button type="button" class="danger" (click)="remove(s.id)">Borrar</button>
              </div>
            </article>
          }
        }
      </div>

      <form class="admin-form" (ngSubmit)="submit()">
        <div class="admin-panel-heading form-heading">
          <div>
            <span>{{ editingId ? 'Modo edicion' : 'Nueva ficha' }}</span>
            <h3>{{ editingId ? 'Editar' : 'Nuevo' }} {{ tabLabel }}</h3>
          </div>
          @if (editingId) {
            <strong>ID {{ editingId }}</strong>
          }
        </div>

        @if (tab === 'products' && productForm.image) {
          <div class="admin-preview">
            <img [src]="productForm.image" [alt]="productForm.name || 'Preview del producto'">
            <span>Preview de imagen</span>
          </div>
        }

        @if (tab === 'products') {
          <label>Nombre
            <input name="name" [(ngModel)]="productForm.name" required>
          </label>
          <label>SKU
            <input name="sku" [(ngModel)]="productForm.sku">
          </label>
          <div class="field-row">
            <label>Escala
              <input name="scale" [(ngModel)]="productForm.scale">
            </label>
            <label>Color
              <input name="color" [(ngModel)]="productForm.color">
            </label>
          </div>
          <div class="field-row">
            <label>Precio ARS
              <input name="price" type="number" [(ngModel)]="productForm.price">
            </label>
            <label>Stock
              <input name="stock" type="number" [(ngModel)]="productForm.stock">
            </label>
          </div>
          <div class="field-row">
            <label>Marca
              <select name="brandId" [(ngModel)]="productForm.brandId">
                @for (b of brands; track b.id) {
                  <option [ngValue]="b.id">{{ b.name }}</option>
                }
              </select>
            </label>
            <label>Categoria
              <select name="categoryId" [(ngModel)]="productForm.categoryId">
                @for (c of categories; track c.id) {
                  <option [ngValue]="c.id">{{ c.name }}</option>
                }
              </select>
            </label>
          </div>
          <label>Rareza
            <input name="rarity" [(ngModel)]="productForm.rarity">
          </label>
          <label>Imagen (ruta en assets/cars)
            <input name="image" [(ngModel)]="productForm.image">
          </label>
        }

        @if (tab === 'brands') {
          <label>Nombre
            <input name="brandName" [(ngModel)]="brandForm.name" required>
          </label>
          <label>Pais
            <input name="country" [(ngModel)]="brandForm.country">
          </label>
          <label>Estilo
            <input name="style" [(ngModel)]="brandForm.style">
          </label>
        }

        @if (tab === 'scales') {
          <label>Nombre
            <input name="scaleName" [(ngModel)]="scaleForm.name" required>
          </label>
          <label>Descripcion
            <input name="scaleDescription" [(ngModel)]="scaleForm.description">
          </label>
        }

        <div class="form-actions">
          <button type="submit" class="primary">{{ editingId ? 'Guardar cambios' : 'Agregar' }}</button>
          @if (editingId) {
            <button type="button" class="ghost" (click)="resetForms()">Cancelar</button>
          }
        </div>
      </form>
    </section>
  `,
  styles: []
})
export class AdminComponent {
  private catalog = inject(CatalogDataService);

  tab: Tab = 'products';
  message = '';
  editingId: number | null = null;

  products: Product[] = [];
  brands: Brand[] = [];
  scales: Scale[] = [];
  categories: { id: number; name: string }[] = [];

  productForm: Partial<Product> = this.emptyProduct();
  brandForm: Partial<Brand> = {};
  scaleForm: Partial<Scale> = {};

  constructor() {
    this.loadAll();
  }

  get tabLabel(): string {
    return this.tab === 'products' ? 'producto' : this.tab === 'brands' ? 'marca' : 'escala';
  }

  get tabTitle(): string {
    return this.tab === 'products' ? 'Productos en vitrina' : this.tab === 'brands' ? 'Marcas cargadas' : 'Escalas disponibles';
  }

  get tabKicker(): string {
    return this.tab === 'products' ? 'Inventario' : this.tab === 'brands' ? 'Fabricantes' : 'Medidas';
  }

  get activeCount(): number {
    return this.tab === 'products' ? this.products.length : this.tab === 'brands' ? this.brands.length : this.scales.length;
  }

  get totalStock(): number {
    return this.products.reduce((total, product) => total + product.stock, 0);
  }

  get inventoryValue(): number {
    return this.products.reduce((total, product) => total + product.price * product.stock, 0);
  }

  loadAll(): void {
    this.catalog.getProducts().subscribe((data) => (this.products = data));
    this.catalog.getBrands().subscribe((data) => (this.brands = data));
    this.catalog.getScales().subscribe((data) => (this.scales = data));
    this.catalog.getCategories().subscribe((data) => (this.categories = data));
  }

  selectTab(tab: Tab): void {
    this.tab = tab;
    this.resetForms();
  }

  editProduct(p: Product): void {
    this.editingId = p.id;
    this.productForm = { ...p };
  }

  editBrand(b: Brand): void {
    this.editingId = b.id;
    this.brandForm = { ...b };
  }

  editScale(s: Scale): void {
    this.editingId = s.id;
    this.scaleForm = { ...s };
  }

  submit(): void {
    const request$: Observable<unknown> = this.tab === 'products'
      ? this.catalog.saveProduct(this.productForm, this.editingId ?? undefined)
      : this.tab === 'brands'
        ? this.catalog.saveBrand(this.brandForm, this.editingId ?? undefined)
        : this.catalog.saveScale(this.scaleForm, this.editingId ?? undefined);

    request$.subscribe({
      next: () => {
        this.notify(this.editingId ? 'Cambios guardados' : 'Agregado correctamente');
        this.resetForms();
        this.loadAll();
      },
      error: () => this.notify('No se pudo guardar, revisa los campos')
    });
  }

  remove(id: number): void {
    const request$: Observable<unknown> = this.tab === 'products'
      ? this.catalog.removeProduct(id)
      : this.tab === 'brands'
        ? this.catalog.removeBrand(id)
        : this.catalog.removeScale(id);

    request$.subscribe({
      next: () => {
        this.notify('Eliminado');
        if (this.editingId) this.resetForms();
        this.loadAll();
      },
      error: () => this.notify('No se pudo eliminar')
    });
  }

  resetForms(): void {
    this.editingId = null;
    this.productForm = this.emptyProduct();
    this.brandForm = {};
    this.scaleForm = {};
  }

  formatPrice(value: number): string {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(value);
  }

  stockLabel(stock: number): string {
    if (stock <= 0) return 'Sin stock';
    if (stock <= 3) return `Stock bajo: ${stock}`;
    return `Stock ${stock}`;
  }

  stockClass(stock: number): string {
    if (stock <= 0) return 'stock-pill out';
    if (stock <= 3) return 'stock-pill low';
    return 'stock-pill';
  }

  private notify(message: string): void {
    this.message = message;
    setTimeout(() => (this.message = ''), 2600);
  }

  private emptyProduct(): Partial<Product> {
    return {
      name: '',
      sku: '',
      scale: '1:64',
      color: '',
      price: 0,
      stock: 0,
      brandId: 1,
      categoryId: 1,
      rarity: 'Mainline',
      image: ''
    };
  }
}
