import express from "express";
const router = express.Router();
import upload from "../middlewares/productImages.js";
import {productDetails ,displayProducts, createProduct, updateKeys, searchProducts, editProduct} from "../controllers/productController.js";

// router.route("/").get(displayProducts);
router.route("/:productId").get(productDetails);
router.route("/search/:name").get(searchProducts);
//Display User's Products
router.route("/displayProducts/:name").get(displayProducts);
router.route("/editProduct/:productId").put(upload.single("image") ,editProduct);
router.route("/create").post(upload.single("image") ,createProduct);
router.route("/updateKeys").put(updateKeys);

export default router;