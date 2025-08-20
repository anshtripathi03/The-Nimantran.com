// routes/wholesaler.routes.js
import express from "express";
import { applyWholesaler} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getAllCards } from "../controllers/admin/wholesaler.controller.js";

const router = express.Router();


router.post("/apply", verifyJWT, applyWholesaler);
router.get("/wholesaleCards",verifyJWT,getAllCards)


export default router;
