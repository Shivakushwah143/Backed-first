
import express from "express";
import upload from "../middleware/upload.js";
import protectRoute from "../middleware/auth.js"
import {createProduct , deleteProduct, getProducts, getProductsById, updateProduct} from "../controllers/product.controller.js"
import signin from "../routes/auth.route.js"
const router = express.Router();
router.post("/",protectRoute, signin,upload.array("images",4) , createProduct)
router.get("/",getProducts);
router.get("/:id", getProductsById);
router.put("/:id", upload.array('images',4), updateProduct);
router.delete("/:id",deleteProduct)
export default router;
