import { Router } from "express";
import productsRouter from "./products.routes";
import categoriesRouter from "./categories.routes";
import brandsRouter from "./brands.routes";
import ordersRouter from "./orders.routes";
import scalesRouter from "./scales.routes";

const router = Router();

router.use("/products", productsRouter);
router.use("/categories", categoriesRouter);
router.use("/brands", brandsRouter);
router.use("/orders", ordersRouter);
router.use("/scales", scalesRouter);

export default router;
