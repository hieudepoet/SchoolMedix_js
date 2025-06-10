// routes/disease.routes.js
import express from "express";
import { createDisease } from "../controllers/disease.controller.js";

const router = express.Router();

router.post("/create/disease", createDisease);

export default router;
