// index.js
import express from "express";
import postRoutes from "./post.routes.js";
import userRoutes from "./users.routes.js";
import diseaseRoutes from "./disease.routes.js";
import vaccineRoutes from "./vaccine.routes.js";

const router = express.Router();

router.use("/", postRoutes);
router.use("/", userRoutes);
router.use("/", diseaseRoutes);
router.use("/", vaccineRoutes);
export default router;
