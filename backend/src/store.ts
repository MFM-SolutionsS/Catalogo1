import { productsMock } from "./mocks/products";
import { brandsMock } from "./mocks/brands";
import { categoriesMock } from "./mocks/categories";
import { scalesMock } from "./mocks/scales";

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

export const store = {
  products: [...productsMock] as Product[],
  brands: [...brandsMock] as Brand[],
  categories: [...categoriesMock] as Category[],
  scales: [...scalesMock] as Scale[]
};

export const nextId = (items: { id: number }[]): number =>
  items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
