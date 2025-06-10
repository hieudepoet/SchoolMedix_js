// disease.controller.js
import { query } from "../config/database.js";

// Tạo mới một disease
export async function createDisease(req, res) {
  const { disease_category, name, description, vaccine_need, dose_quantity } =
    req.body;

  if (!name || vaccine_need === undefined || dose_quantity === undefined) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const insertQuery = `
        INSERT INTO disease (disease_category, name, description, vaccine_need, dose_quantity)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
        `;
    const values = [
      disease_category || null,
      name,
      description || null,
      vaccine_need,
      dose_quantity,
    ];
    const result = await query(insertQuery, values);

    return res
      .status(201)
      .json({ message: "Disease created", data: result.rows[0] });
  } catch (error) {
    console.error("Error creating disease:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Lấy tất cả các disease
export async function getAllDisease(req, res) {
  try {
    const result = await query("SELECT * FROM disease ORDER BY id;");
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching diseases:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
