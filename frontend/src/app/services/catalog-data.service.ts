import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export type Product = {
  id: number;
  sku: string;
  name: string;
  scale: string;
  color: string;
  price: number;
  stock: number;
  categoryId: number;
  brandId: number;
  rarity: string;
  image: string;
};

export type Brand = { id: number; name: string; country: string; style: string };
export type Category = { id: number; name: string; slug: string; description: string };
export type Scale = { id: number; name: string; description: string };
export type Order = { id: number; customer: string; status: string; total: number; items: number };

const productsSeed: Product[] = [
  { id: 1, sku: 'HW-001', name: 'Nissan Skyline GT-R', scale: '1:64', color: 'Azul', price: 12500, stock: 4, categoryId: 2, brandId: 1, rarity: 'Premium', image: 'assets/cars/nissan skyline GT-R.jpeg' },
  { id: 2, sku: 'HW-002', name: 'Porsche 911 Carrera T', scale: '1:64', color: 'Blanco', price: 9800, stock: 7, categoryId: 2, brandId: 1, rarity: 'Factory Fresh', image: 'assets/cars/Porsche 911 Carrera T Factory Fresh C4982 de Hot Wheels.webp' },
  { id: 3, sku: 'HW-003', name: 'Honda Civic Type R 2018', scale: '1:64', color: 'Rojo', price: 7200, stock: 11, categoryId: 2, brandId: 1, rarity: 'Mainline', image: 'assets/cars/Hot Wheels X1 Gran Variedad De Modelos Color 2018 Honda Civic Type R.webp' },
  { id: 4, sku: 'HW-004', name: 'LB-Works Lamborghini Huracan', scale: '1:64', color: 'Verde', price: 14500, stock: 3, categoryId: 2, brandId: 1, rarity: 'Exotic', image: 'assets/cars/Hot Wheels Lb-works Lamborghini Huracan Coupe Esc.webp' },
  { id: 5, sku: 'HW-005', name: 'Batimovil', scale: '1:64', color: 'Negro', price: 13200, stock: 5, categoryId: 4, brandId: 1, rarity: 'Pop Culture', image: 'assets/cars/Batimovil.webp' },
  { id: 6, sku: 'HW-006', name: 'Pack Rapido y Furioso', scale: '1:64', color: 'Varios', price: 35900, stock: 2, categoryId: 4, brandId: 1, rarity: 'Pack', image: 'assets/cars/rapido y furioso-pack.jpeg' },
  { id: 7, sku: 'HW-007', name: 'Ford Transit Supervan', scale: '1:64', color: 'Azul', price: 8900, stock: 6, categoryId: 5, brandId: 1, rarity: 'Utility', image: 'assets/cars/FORD transit supervan.jpeg' },
  { id: 8, sku: 'HW-008', name: 'LB-Works McLaren 720S', scale: '1:64', color: 'Naranja', price: 15100, stock: 3, categoryId: 2, brandId: 2, rarity: 'Premium', image: 'assets/cars/LB-Works McLAREN 720S.jpeg' },
  { id: 9, sku: 'HW-009', name: 'Toyota Supra Fast & Furious', scale: '1:64', color: 'Naranja', price: 16800, stock: 4, categoryId: 4, brandId: 1, rarity: 'Movie Car', image: 'assets/cars/Toyota Suprea Fast & Furious.webp' },
  { id: 10, sku: 'HW-010', name: 'Ferrari F40 Competizione', scale: '1:64', color: 'Rojo', price: 18500, stock: 2, categoryId: 2, brandId: 2, rarity: 'Premium', image: 'assets/cars/Ferrari F40 competizione.webp' },
  { id: 11, sku: 'HW-011', name: 'BMW M4 GT3', scale: '1:64', color: 'Blanco', price: 14900, stock: 5, categoryId: 2, brandId: 2, rarity: 'Track', image: 'assets/cars/BMW M$ GT3.jpg' },
  { id: 12, sku: 'HW-012', name: 'Nissan 300ZX Twin Turbo', scale: '1:64', color: 'Rojo', price: 11800, stock: 6, categoryId: 2, brandId: 1, rarity: 'JDM', image: 'assets/cars/Nissan 300ZX TWIN turbo.webp' },
  { id: 13, sku: 'HW-013', name: 'Toyota Supra Verde', scale: '1:64', color: 'Verde', price: 13200, stock: 4, categoryId: 2, brandId: 1, rarity: 'JDM', image: 'assets/cars/Toyota Supra Verde.avif' },
  { id: 14, sku: 'HW-014', name: 'Racer Verse Woody', scale: '1:64', color: 'Marron', price: 10400, stock: 7, categoryId: 4, brandId: 1, rarity: 'Character Car', image: 'assets/cars/Racer Verse Woody.webp' },
  { id: 15, sku: 'HW-015', name: 'HW450F Moto', scale: '1:64', color: 'Rojo', price: 7600, stock: 9, categoryId: 5, brandId: 1, rarity: 'Moto', image: 'assets/cars/HW450F.webp' },
  { id: 16, sku: 'HW-016', name: '1987 Chevy Caprice', scale: '1:64', color: 'Negro', price: 11200, stock: 5, categoryId: 3, brandId: 1, rarity: 'Classic', image: 'assets/cars/1987 chevy caprice.jpg' },
  { id: 17, sku: 'HW-017', name: 'Williams Racing F1', scale: '1:64', color: 'Azul y blanco', price: 15900, stock: 3, categoryId: 2, brandId: 1, rarity: 'Racing', image: 'assets/cars/williams Racing.webp' },
  { id: 18, sku: 'HW-018', name: 'Liberty Walk GT-R', scale: '1:64', color: 'Gris', price: 16400, stock: 4, categoryId: 2, brandId: 1, rarity: 'Liberty Walk', image: 'assets/cars/liberty walk.webp' },
  { id: 19, sku: 'HW-019', name: 'Custom Otto', scale: '1:64', color: 'Personalizado', price: 6900, stock: 8, categoryId: 1, brandId: 1, rarity: 'Fantasy', image: 'assets/cars/Custom Otto.webp' },
  { id: 20, sku: 'HW-020', name: '71 Mustang Funny Car', scale: '1:64', color: 'Rojo', price: 12400, stock: 5, categoryId: 3, brandId: 1, rarity: 'Dragster', image: 'assets/cars/71 Mustang Funny CAR.webp' },
  { id: 21, sku: 'HW-021', name: '65 Ford Mustang Convertible', scale: '1:64', color: 'Azul', price: 11900, stock: 6, categoryId: 3, brandId: 1, rarity: 'Classic', image: 'assets/cars/65 FORD Mustang Convertible.jpg' },
  { id: 22, sku: 'HW-022', name: 'Bentley Continental GT3', scale: '1:64', color: 'Verde', price: 16500, stock: 3, categoryId: 2, brandId: 2, rarity: 'Track', image: 'assets/cars/2018-bentley continental GT3.jpeg' },
  { id: 23, sku: 'HW-023', name: '92 Honda Civic EG', scale: '1:64', color: 'Blanco', price: 8900, stock: 9, categoryId: 2, brandId: 1, rarity: 'JDM', image: "assets/cars/Hot Wheels N° 95 '92 Honda Civic Eg.webp" },
  { id: 24, sku: 'HW-024', name: '92 Honda Civic EG - variante', scale: '1:64', color: 'Rojo', price: 9400, stock: 6, categoryId: 2, brandId: 1, rarity: 'JDM', image: "assets/cars/Hot Wheels N° 95 '92 Honda Civic Eg-2.webp" },
  { id: 25, sku: 'HW-025', name: '92 Honda Civic EG - variante 2', scale: '1:64', color: 'Azul', price: 9400, stock: 6, categoryId: 2, brandId: 1, rarity: 'JDM', image: "assets/cars/Hot Wheels N° 95 '92 Honda Civic Eg-3.webp" },
  { id: 26, sku: 'HW-026', name: 'Honda Civic Type R 2018 - blanco', scale: '1:64', color: 'Blanco', price: 7900, stock: 10, categoryId: 2, brandId: 1, rarity: 'Mainline', image: 'assets/cars/Hot Wheels X1 Gran Variedad De Modelos Color 2018 Honda Civic Type R-2.webp' },
  { id: 27, sku: 'HW-027', name: 'Batimovil - variante', scale: '1:64', color: 'Negro', price: 13900, stock: 4, categoryId: 4, brandId: 1, rarity: 'Pop Culture', image: 'assets/cars/batimovil-2.webp' },
  { id: 28, sku: 'HW-028', name: 'Rapido y Furioso 2', scale: '1:64', color: 'Varios', price: 14900, stock: 5, categoryId: 4, brandId: 1, rarity: 'Movie Car', image: 'assets/cars/rapido y furioso-2.png' },
  { id: 29, sku: 'HW-029', name: 'Pack Mario Bros 1', scale: '1:64', color: 'Varios', price: 29900, stock: 3, categoryId: 4, brandId: 1, rarity: 'Pack', image: 'assets/cars/mario-pack1.jpeg' },
  { id: 30, sku: 'HW-030', name: 'Pack Mario Bros 2', scale: '1:64', color: 'Varios', price: 29900, stock: 3, categoryId: 4, brandId: 1, rarity: 'Pack', image: 'assets/cars/mario-pack2.jpeg' },
  { id: 31, sku: 'HW-031', name: 'Pack Mario Bros 3', scale: '1:64', color: 'Varios', price: 29900, stock: 3, categoryId: 4, brandId: 1, rarity: 'Pack', image: 'assets/cars/mario-pack3.jpeg' },
  { id: 32, sku: 'HW-032', name: 'Pack Mario Bros 4', scale: '1:64', color: 'Varios', price: 29900, stock: 3, categoryId: 4, brandId: 1, rarity: 'Pack', image: 'assets/cars/mario-pack4.jpeg' },
  { id: 33, sku: 'MT-043', name: 'Porsche 911 Carrera T Vitrina', scale: '1:43', color: 'Blanco', price: 24200, stock: 4, categoryId: 2, brandId: 4, rarity: 'Vitrina', image: 'assets/cars/Porsche 911 Carrera T Factory Fresh C4982 de Hot Wheels.webp' },
  { id: 34, sku: 'MT-044', name: 'Nissan Skyline GT-R Display', scale: '1:43', color: 'Azul', price: 26800, stock: 3, categoryId: 2, brandId: 2, rarity: 'JDM Display', image: 'assets/cars/nissan skyline GT-R.jpeg' },
  { id: 35, sku: 'MT-045', name: 'Ferrari F40 Competizione Vitrina', scale: '1:43', color: 'Rojo', price: 28900, stock: 2, categoryId: 2, brandId: 2, rarity: 'Competizione', image: 'assets/cars/Ferrari F40 competizione.webp' },
  { id: 36, sku: 'MT-046', name: 'Bentley Continental GT3 Display', scale: '1:43', color: 'Verde', price: 27900, stock: 2, categoryId: 2, brandId: 2, rarity: 'GT3', image: 'assets/cars/2018-bentley continental GT3.jpeg' },
  { id: 37, sku: 'MT-032', name: 'Toyota Supra Fast & Furious Mediana', scale: '1:32', color: 'Naranja', price: 33600, stock: 3, categoryId: 4, brandId: 4, rarity: 'Movie Display', image: 'assets/cars/Toyota Suprea Fast & Furious.webp' },
  { id: 38, sku: 'MT-033', name: 'BMW M4 GT3 Track Edition', scale: '1:32', color: 'Blanco', price: 31800, stock: 4, categoryId: 2, brandId: 2, rarity: 'Track Display', image: 'assets/cars/BMW M$ GT3.jpg' },
  { id: 39, sku: 'MT-034', name: 'LaFerrari Rosso Display', scale: '1:32', color: 'Rojo', price: 35200, stock: 2, categoryId: 2, brandId: 2, rarity: 'Supercar', image: 'assets/cars/LAFERRARI.jpg' },
  { id: 40, sku: 'MT-024', name: '65 Ford Mustang Convertible Shelf', scale: '1:24', color: 'Azul', price: 41900, stock: 2, categoryId: 3, brandId: 3, rarity: 'Classic Shelf', image: 'assets/cars/65 FORD Mustang Convertible.jpg' },
  { id: 41, sku: 'MT-025', name: '1987 Chevy Caprice Lowrider', scale: '1:24', color: 'Negro', price: 39800, stock: 2, categoryId: 3, brandId: 3, rarity: 'Street Classic', image: 'assets/cars/1987 chevy caprice.jpg' },
  { id: 42, sku: 'MT-026', name: 'Ford Transit Supervan Taller', scale: '1:24', color: 'Azul', price: 38600, stock: 3, categoryId: 5, brandId: 4, rarity: 'Utility Display', image: 'assets/cars/FORD transit supervan.jpeg' },
  { id: 43, sku: 'MG-043', name: 'McLaren W1 Launch Edition', scale: '1:64', color: 'Gris', price: 21400, stock: 4, categoryId: 2, brandId: 2, rarity: 'New Model', image: 'assets/cars/McLAREN W1.webp' },
  { id: 44, sku: 'MG-044', name: 'McLaren W1 Naranja', scale: '1:64', color: 'Naranja', price: 21900, stock: 3, categoryId: 2, brandId: 2, rarity: 'Supercar', image: 'assets/cars/McLAREN W1 Naranja.webp' },
  { id: 45, sku: 'MG-045', name: 'McLaren P1 Rojo', scale: '1:64', color: 'Rojo', price: 19600, stock: 5, categoryId: 2, brandId: 2, rarity: 'Hypercar', image: 'assets/cars/McLAREN P1 Rojo.png' },
  { id: 46, sku: 'MG-046', name: 'McLaren P1 Negro', scale: '1:64', color: 'Negro', price: 19600, stock: 4, categoryId: 2, brandId: 2, rarity: 'Hypercar', image: 'assets/cars/McLAREN P1 Negro.jpg' },
  { id: 47, sku: 'MG-047', name: 'McLaren F1 Rojo', scale: '1:64', color: 'Rojo', price: 23200, stock: 2, categoryId: 2, brandId: 2, rarity: 'Legend', image: 'assets/cars/McLAREN F1 Rojo.jpg' },
  { id: 48, sku: 'MG-048', name: 'LaFerrari Roja', scale: '1:64', color: 'Rojo', price: 22500, stock: 3, categoryId: 2, brandId: 2, rarity: 'Exotic', image: 'assets/cars/Laferrari Roja.jpg' },
  { id: 49, sku: 'JL-049', name: '64 Chevy Chevelle SS Rojo', scale: '1:64', color: 'Rojo', price: 13700, stock: 6, categoryId: 3, brandId: 3, rarity: 'Muscle', image: "assets/cars/64' Chevy' CHEVELLE 55-Rojo.webp" },
  { id: 50, sku: 'JL-050', name: '64 Chevy Chevelle SS Amarilla', scale: '1:64', color: 'Amarillo', price: 13700, stock: 6, categoryId: 3, brandId: 3, rarity: 'Muscle', image: "assets/cars/64' Chevy' CHEVELLE 55-Amarilla.png" },
  { id: 51, sku: 'JL-051', name: '64 Chevy Chevelle Speed Blur', scale: '1:64', color: 'Grafica Speed Blur', price: 14900, stock: 4, categoryId: 3, brandId: 3, rarity: 'Speed Blur', image: "assets/cars/64' Chevy' CHEVELLE 55-SPEED BLUR tm.jpg" }
];

const brandsSeed: Brand[] = [
  { id: 1, name: 'Hot Wheels', country: 'USA', style: 'Velocidad y fantasia' },
  { id: 2, name: 'Mini GT', country: 'HK', style: 'Detalle premium' },
  { id: 3, name: 'Johnny Lightning', country: 'USA', style: 'Clasicos americanos' },
  { id: 4, name: 'Matchbox', country: 'UK', style: 'Realismo urbano' }
];

const categoriesSeed: Category[] = [
  { id: 1, name: 'Fantasy Cars', slug: 'fantasy-cars', description: 'Disenos originales y modelos imposibles.' },
  { id: 2, name: 'JDM & Imports', slug: 'jdm-imports', description: 'Autos japoneses, europeos y coleccionables importados.' },
  { id: 3, name: 'Muscle Cars', slug: 'muscle-cars', description: 'Clasicos americanos a escala.' },
  { id: 4, name: 'Pop Culture', slug: 'pop-culture', description: 'Modelos de peliculas, series y ediciones especiales.' },
  { id: 5, name: 'Off-Road', slug: 'off-road', description: '4x4, camionetas y modelos de aventura.' }
];

const scalesSeed: Scale[] = [
  { id: 1, name: '1:64', description: 'Escala estandar de coleccion' },
  { id: 2, name: '1:43', description: 'Escala premium de vitrina, con mas presencia sin ocupar demasiado' },
  { id: 3, name: '1:32', description: 'Escala intermedia para modelos con mejor detalle' },
  { id: 4, name: '1:24', description: 'Escala mediana de exhibicion, todavia apta para repisa' }
];

const ordersSeed: Order[] = [
  { id: 1001, customer: 'Ana Ruiz', status: 'reservado', total: 22300, items: 2 },
  { id: 1002, customer: 'Luis Mora', status: 'pagado', total: 13200, items: 1 },
  { id: 1003, customer: 'Carla Vega', status: 'preparando', total: 51000, items: 3 }
];

@Injectable({ providedIn: 'root' })
export class CatalogDataService {
  private readonly productsKey = 'el-garage-products';
  private readonly brandsKey = 'el-garage-brands';
  private readonly scalesKey = 'el-garage-scales';

  private products = this.load(this.productsKey, productsSeed);
  private brands = this.load(this.brandsKey, brandsSeed);
  private scales = this.load(this.scalesKey, scalesSeed);

  getProducts(): Observable<Product[]> {
    return of(this.clone(this.products));
  }

  getProduct(id: number): Observable<Product | undefined> {
    return of(this.clone(this.products.find((product) => product.id === id)));
  }

  getBrands(): Observable<Brand[]> {
    return of(this.clone(this.brands));
  }

  getCategories(): Observable<Category[]> {
    return of(this.clone(categoriesSeed));
  }

  getScales(): Observable<Scale[]> {
    return of(this.clone(this.scales));
  }

  getOrders(): Observable<Order[]> {
    return of(this.clone(ordersSeed));
  }

  saveProduct(product: Partial<Product>, id?: number): Observable<Product> {
    const saved = id ? this.update(this.products, id, product) : this.create(this.products, product as Product);
    this.persist(this.productsKey, this.products);
    return of(this.clone(saved));
  }

  saveBrand(brand: Partial<Brand>, id?: number): Observable<Brand> {
    const saved = id ? this.update(this.brands, id, brand) : this.create(this.brands, brand as Brand);
    this.persist(this.brandsKey, this.brands);
    return of(this.clone(saved));
  }

  saveScale(scale: Partial<Scale>, id?: number): Observable<Scale> {
    const saved = id ? this.update(this.scales, id, scale) : this.create(this.scales, scale as Scale);
    this.persist(this.scalesKey, this.scales);
    return of(this.clone(saved));
  }

  removeProduct(id: number): Observable<void> {
    this.products = this.products.filter((product) => product.id !== id);
    this.persist(this.productsKey, this.products);
    return of(void 0);
  }

  removeBrand(id: number): Observable<void> {
    this.brands = this.brands.filter((brand) => brand.id !== id);
    this.persist(this.brandsKey, this.brands);
    return of(void 0);
  }

  removeScale(id: number): Observable<void> {
    this.scales = this.scales.filter((scale) => scale.id !== id);
    this.persist(this.scalesKey, this.scales);
    return of(void 0);
  }

  private create<T extends { id: number }>(items: T[], body: T): T {
    const item = { ...body, id: this.nextId(items) };
    items.push(item);
    return item;
  }

  private update<T extends { id: number }>(items: T[], id: number, body: Partial<T>): T {
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) throw new Error('Item not found');
    items[index] = { ...items[index], ...body, id };
    return items[index];
  }

  private nextId(items: { id: number }[]): number {
    return items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
  }

  private load<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : this.clone(fallback);
    } catch {
      return this.clone(fallback);
    }
  }

  private persist<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  private clone<T>(value: T): T {
    if (value == null) return value;
    return JSON.parse(JSON.stringify(value));
  }
}
