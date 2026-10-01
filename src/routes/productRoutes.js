import express from "express";
import {
	getAllProducts,
	getProduct,
	addProduct,
	replaceProduct,
	editProduct,
	removeProduct
} from "../controllers/productController.js";
import productTypeChecker, { patchProductTypeChecker } from "../middleware/productTypeChecker.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/products/:id", getProduct);
router.post("/products", productTypeChecker, addProduct);
router.put("/products/:id", productTypeChecker, replaceProduct);
router.patch("/products/:id", patchProductTypeChecker, editProduct);
router.delete("/products/:id", removeProduct);

export default router;
