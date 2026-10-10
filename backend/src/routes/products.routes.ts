import { Router } from "express";
import { nextId, Product, store } from "../store";

const router = Router();

router.get("/", (_req, res) => {
  res.json(store.products);
});

router.get("/:id", (req, res) => {
  const product = store.products.find((item) => item.id === Number(req.params.id));

  if (!product) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  res.json(product);
});

router.post("/", (req, res) => {
  const body = req.body as Partial<Product>;

  if (!body.name || body.price == null) {
    res.status(400).json({ message: "name and price are required" });
    return;
  }

  const product: Product = {
    id: nextId(store.products),
    sku: body.sku || "SKU-" + Date.now(),
    name: body.name,
    scale: body.scale || "1:64",
    color: body.color || "",
    price: Number(body.price),
    stock: Number(body.stock ?? 0),
    categoryId: Number(body.categoryId ?? 1),
    brandId: Number(body.brandId ?? 1),
    rarity: body.rarity || "Mainline",
    image: body.image || ""
  };

  store.products.push(product);
  res.status(201).json(product);
});

router.put("/:id", (req, res) => {
  const index = store.products.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  const body = req.body as Partial<Product>;
  store.products[index] = { ...store.products[index], ...body, id: store.products[index].id };
  res.json(store.products[index]);
});

router.delete("/:id", (req, res) => {
  const index = store.products.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    res.status(404).json({ message: "Product not found" });
    return;
  }

  store.products.splice(index, 1);
  res.status(204).end();
});

export default router;
