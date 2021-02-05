import express from "express";
const router = express.Router();
import authProtect from "../middlewares/authProtect.js";
import {addOrderItems, getOrderById, updateOrderToPaid, userOrders} from "../controllers/orderController.js";

router.route("/").get(authProtect, userOrders);
router.route("/").post(authProtect, addOrderItems);

router.route('/:id').get(authProtect, getOrderById);
router.route('/:id/pay').put(authProtect, updateOrderToPaid);

export default router;