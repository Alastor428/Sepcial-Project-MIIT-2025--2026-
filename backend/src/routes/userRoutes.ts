import express from "express";
import {
  getUserDashboard,
  checkUserByPhone,
} from "../controllers/userControllers";
import { loginUser } from "../controllers/userControllers";
const router = express.Router();

router.get("/:id/dashboard", getUserDashboard);
router.get("/check/:phoneNumber", checkUserByPhone);
router.post("/login", loginUser);

export default router;
