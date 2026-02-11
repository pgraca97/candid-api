import { Request, Response } from "express";
import { applicationModel } from "../models/application.model.js";

export const applicationController = {
  create: async (req: Request, res: Response) => {
    try {
      const { companyId, position, status, notes } = req.body;

      // Validação básica para já
      if (!companyId || !position) {
        return res.status(400).json({
          error: "Company and position are required",
        });
      }

      const newApplication = await applicationModel.create({
        companyId,
        position,
        status,
        notes,
      });

      res.status(201).json(newApplication);
    } catch (error) {
      console.error("Error creating application:", error);
      res.status(500).json({ error: "Failed to create application" });
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const allApplications = await applicationModel.getAll();
      res.status(200).json(allApplications);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).json({ error: "Failed to fetch applications" });
    }
  },

  getById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const application = await applicationModel.getById(Number(id));

      console.log(application);

      if (!application) {
        return res.status(404).json({ error: "Application not found. Nothing to fetch." });
      }

      res.status(200).json(application);
    } catch (error) {
      console.error("Error fetching application by ID:", error);
      res.status(500).json({ error: "Failed to fetch application" });
    }
  },

  update: async (req: Request, res: Response) => {
    // Receber/guardar o before value e devolver na resposta???
    try {
      const { id } = req.params;
      const body = req.body;

      console.log("Received update request for application ID:", id);
      console.log("Request body:", body);

      //Verifica se o body não está vazio
      if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({ error: "Request body is empty. Nothing to update." });
      }

      // Verifica se a candidatura existe
      const existingApplication = await applicationModel.getById(Number(id));
      if (!existingApplication) {
        return res.status(404).json({ error: "Application not found. Nothing to update." });
      }

      console.log("Existing application before update:", existingApplication);

      const updatedApplication = await applicationModel.update(Number(id), body);

      res.status(200).json(updatedApplication);
    } catch (error) {
      console.error("Error updating application:", error);
      res.status(500).json({ error: "Failed to update application" });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await applicationModel.delete(Number(id));

      // Verifica se a candidatura existia
      if (!deleted) {
        return res.status(404).json({ error: "Application not found. Nothing to delete." });
      }

      res.status(200).json({ message: "Application deleted successfully" });
    } catch (error) {
      console.error("Error deleting application:", error);
      res.status(500).json({ error: "Failed to delete application" });
    }
  },
};