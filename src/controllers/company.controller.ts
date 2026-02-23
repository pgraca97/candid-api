import { Request, Response } from "express";
import { companyModel } from "../models/company.model";

export const companyController = {
  create: async (req: Request, res: Response) => {
    try {
      const { name, description, logoUrl, website, location, industry, companySize, notes } = req.body;

      // Validação básica para já
      if (!name) {
        return res.status(400).json({
          error: "Company name is required",
        });
      }

      const newCompany = await companyModel.create({
        name,
        description,
        logoUrl,
        website,
        location,
        industry,
        companySize,
        notes,
      });

      res.status(201).json(newCompany);
    } catch (error) {
      console.error("Error creating company:", error);
      res.status(500).json({ error: "Failed to create company" });
    }
  },
  getAll: async (req: Request, res: Response) => {
    try {
      // Type guard
      const search = typeof req.query.search === 'string' ? req.query.search : undefined;

      const allCompanies = await companyModel.getAll(search);
      res.status(200).json(allCompanies);
    } catch (error) {
      console.error("Error fetching companies:", error);
      res.status(500).json({ error: "Failed to fetch companies" });
    }
  },
  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const company = await companyModel.getById(Number(id))

      if (!company) {
        return res.status(404).json({ error: "Company not found. Nothing to fetch" })
      }

      res.status(200).json(company)
    } catch (error) {
      console.error("Error fetching company by ID:", error)
      res.status(500).json({ error: "Failed to fetch application" });
    }
  }
};