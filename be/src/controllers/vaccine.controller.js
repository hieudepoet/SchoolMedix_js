// vaccination.controller.js
import e from "express";
import { query } from "../config/database.js";

// Vaccine
export async function createVaccine(req, res) {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    //Kiểm tra xem vaccine đã tồn tại chưa
    const vaccines = await query("SELECT * FROM vaccine WHERE name = $1", [
      name,
    ]);
    const existing = vaccines.rows[0];
    if (existing) {
      return res.status(409).json({ error: `Vaccine ${name} already exists` });
    }

    //Extract disease_name from description
    const disease_match = description.match(/bệnh\s+(.+?)(?=\s+-)/i);
    if (disease_match && disease_match[1]) {
      console.log("Extracted disease name:", disease_match[1]);
    }
    if (!disease_match || !disease_match[1]) {
      return res
        .status(400)
        .json({ error: "Cannot extract disease name from description" });
    }

    //Match disease_id from disease_name
    const disease_name = disease_match[1].trim();
    const diseases = await query("SELECT * FROM disease WHERE name = $1", [
      disease_name,
    ]);
    if (!diseases.rows || diseases.rows.length === 0) {
      console.error("Cannot find disease ID from disease name:", disease_name);
      return res
        .status(400)
        .json({ error: "Cannot find disease ID from disease name" });
    }

    const disease_id = diseases.rows[0].id;

    //Insert vaccine into database
    const insertQuery = `
        INSERT INTO vaccine (name, description, disease_id)
        VALUES ($1, $2, $3)
        RETURNING *;
    `;

    const result = await query(insertQuery, [name, description, disease_id]);
    return res
      .status(201)
      .json({ message: "Vaccine created", data: result.rows[0] });
  } catch (error) {
    console.error("Error creating vaccine:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
//export async function getAllVaccines(req, res) {}

// Campaign
export async function createCampaign(req, res) {}
// export async function getAllCampaigns(req, res) {}
// export async function getCampaignDetail(req, res) {}
// export async function deleteCampaign(req, res) {} // Optional

// Register
export async function createRegisterRequest(req, res) {}
// export async function updateRegisterStatus(req, res) {}
// export async function getRegisterStatus(req, res) {}
// export async function getStudentEligibleForCampaign(req, res) {}

// Record
export async function createRecord(req, res) {}
// export async function getStudentVaccinationRecords(req, res) {}
