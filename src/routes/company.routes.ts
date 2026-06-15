import { Router } from "express";
import { companyController } from "../controllers/company.controller";

const router = Router();

// POST /api/companies - Criar nova empresa
router.post("/", companyController.create);

// GET /api/companies - Listar todas as empresas
router.get("/", companyController.getAll);

// GET /api/companies/:id - Obter detalhes de uma empresa específica
router.get("/:id", companyController.getById)

export default router;