import { Router } from "express";
import { Scale, nextId, store } from "../store";

const router = Router();

router.get("/", (_req, res) => {
  res.json(store.scales);
});

router.post("/", (req, res) => {
  const body = req.body as Partial<Scale>;

  if (!body.name) {
    res.status(400).json({ message: "name is required" });
    return;
  }

  const scale: Scale = {
    id: nextId(store.scales),
    name: body.name,
    description: body.description || ""
  };

  store.scales.push(scale);
  res.status(201).json(scale);
});

router.put("/:id", (req, res) => {
  const index = store.scales.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    res.status(404).json({ message: "Scale not found" });
    return;
  }

  const body = req.body as Partial<Scale>;
  store.scales[index] = { ...store.scales[index], ...body, id: store.scales[index].id };
  res.json(store.scales[index]);
});

router.delete("/:id", (req, res) => {
  const index = store.scales.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    res.status(404).json({ message: "Scale not found" });
    return;
  }

  store.scales.splice(index, 1);
  res.status(204).end();
});

export default router;
