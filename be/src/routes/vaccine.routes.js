// routes/vaccination.routes.js
import express from "express";
import { createVaccine } from "../controllers/vaccine.controller.js";

const router = express.Router();

router.post("/create/vaccine", createVaccine);

export default router;
