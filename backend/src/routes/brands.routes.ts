import { Router } from "express";
import { Brand, nextId, store } from "../store";

const router = Router();

router.get("/", (_req, res) => {
  res.json(store.brands);
});

router.post("/", (req, res) => {
  const body = req.body as Partial<Brand>;

  if (!body.name) {
    res.status(400).json({ message: "name is required" });
    return;
  }

  const brand: Brand = {
    id: nextId(store.brands),
    name: body.name,
    country: body.country || "",
    style: body.style || ""
  };

  store.brands.push(brand);
  res.status(201).json(brand);
});

router.put("/:id", (req, res) => {
  const index = store.brands.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    res.status(404).json({ message: "Brand not found" });
    return;
  }

  const body = req.body as Partial<Brand>;
  store.brands[index] = { ...store.brands[index], ...body, id: store.brands[index].id };
  res.json(store.brands[index]);
});

router.delete("/:id", (req, res) => {
  const index = store.brands.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    res.status(404).json({ message: "Brand not found" });
    return;
  }

  store.brands.splice(index, 1);
  res.status(204).end();
});

export default router;
