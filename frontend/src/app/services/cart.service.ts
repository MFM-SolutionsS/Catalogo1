import { computed, Injectable, signal } from '@angular/core';

export type CartProduct = {
  id: number;
  sku: string;
  name: string;
  scale: string;
  color: string;
  price: number;
  stock: number;
  rarity: string;
  image: string;
};

export type CartItem = CartProduct & { quantity: number };

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly storageKey = 'el-garage-cart';
  private itemsSignal = signal<CartItem[]>(this.loadCart());

  items = this.itemsSignal.asReadonly();
  count = computed(() => this.items().reduce((total, item) => total + item.quantity, 0));
  total = computed(() => this.items().reduce((total, item) => total + item.price * item.quantity, 0));

  add(product: CartProduct): void {
    const current = this.itemsSignal().find((item) => item.id === product.id);

    if (current) {
      this.setItems(
        this.itemsSignal().map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
      );
      return;
    }

    this.setItems([...this.itemsSignal(), { ...product, quantity: 1 }]);
  }

  remove(productId: number): void {
    this.setItems(this.itemsSignal().filter((item) => item.id !== productId));
  }

  clear(): void {
    this.setItems([]);
  }

  private setItems(items: CartItem[]): void {
    this.itemsSignal.set(items);
    this.saveCart(items);
  }

  private loadCart(): CartItem[] {
    try {
      const raw = localStorage.getItem(this.storageKey);
      const items = raw ? JSON.parse(raw) : [];

      return Array.isArray(items) ? items : [];
    } catch {
      return [];
    }
  }

  private saveCart(items: CartItem[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }
}
