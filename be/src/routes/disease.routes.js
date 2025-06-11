// routes/disease.routes.js
import express from "express";
import {
  createDisease,
  readDisease,
  updateDisease,
  deleteDisease,
} from "../controllers/disease.controller.js";

const router = express.Router();

router.post("/create/disease", createDisease);
router.get("/read/disease/:id", readDisease);
router.put("/update/disease/:id", updateDisease);
router.delete("/delete/disease/:id", deleteDisease);

export default router;
