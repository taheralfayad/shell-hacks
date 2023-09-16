import express from "express";
import Company from "../models/company.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const company = new Company(req.body);
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get a list of all companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific company by ID
router.get("/:stockSymbol", async (req, res) => {
  try {
    const company = await Company.findOne({ stockSymbol: req.params.stockSymbol });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a specific company by ID
router.put("/:id", async (req, res) => {
  try {
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated company
    });
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a specific company by ID
router.delete("/:id", async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).json({ error: "Company not found" });
    }
    res.json({ message: "Company deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
