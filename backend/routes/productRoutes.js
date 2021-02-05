import express from "express";
const router = express.Router();
import {productDetails ,displayProducts, createProduct, updateKeys, searchProducts, editProduct, deleteProduct} from "../controllers/productController.js";

// router.route("/").get(displayProducts);
router.route("/:productId").get(productDetails);
router.route("/search/:name").get(searchProducts);
//Display User's Products
router.route("/displayProducts/:name").get(displayProducts);
router.route("/editProduct/:productId").put(editProduct);
router.route("/deleteProduct/:productId").delete(deleteProduct);
router.route("/create").post(createProduct);
router.route("/updateKeys").put(updateKeys);

export default router;