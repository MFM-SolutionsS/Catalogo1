import { Router } from "express";
import { ordersMock } from "../mocks/orders";

const router = Router();

router.get("/", (_req, res) => {
  res.json(ordersMock);
});

export default router;
