import express from "express";
const router = express.Router();
import upload from "../middlewares/avatarImages.js";
import authProtect from "../middlewares/authProtect.js";
import {getUsers, searchUsersByName, userProfile, displayFeedbacks, giveFeedback, editUser, userSales} from "../controllers/userController.js";

router.route("/").get(authProtect, getUsers);
router.route("/sales").get(authProtect, userSales);

router.route("/editUser/:userId").put(upload.single("image"), editUser);

router.route("/feedbacks/:name").get(displayFeedbacks);
router.route("/feedbacks/:name").post(authProtect, giveFeedback);

router.route("/search/:name").get(authProtect, searchUsersByName);
router.route("/:name").get(userProfile);

export default router;