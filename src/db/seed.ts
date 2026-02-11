import pool from "../config/db.js";
import { drizzle } from "drizzle-orm/node-postgres";
import { applications, companies } from "./schema.js";

const db = drizzle(pool);

// Dados dummy para companies
const dummyCompanies = [
  {
    name: "Talkdesk",
    description: "Cloud contact center software provider. Platform enables businesses to deliver better customer service through AI-powered solutions and omnichannel support.",
    logoUrl: null, 
    website: "https://www.talkdesk.com",
    location: "Remote - Portugal",
    industry: "SaaS",
    companySize: "1000-5000",
    notes: "Empresa portuguesa bem conhecida. Cultura tech forte.",
  },
  {
    name: "Blip",
    description: "Conversational AI platform for building chatbots and automated customer service solutions. Part of Take Blip group focused on digital transformation.",
    logoUrl: null,
    website: "https://www.blip.ai",
    location: "Remote - Brazil/Portugal",
    industry: "AI/SaaS",
    companySize: "200-500",
    notes: "Stack interessante com Node.js. Processos de hiring rápidos.",
  },
  {
    name: "Feedzai",
    description: "AI-powered risk management platform for financial institutions. Focuses on fraud prevention and financial crime detection using machine learning.",
    logoUrl: null,
    website: "https://www.feedzai.com",
    location: "Coimbra, Portugal",
    industry: "Fintech",
    companySize: "500-1000",
    notes: "Unicórnio português. Trabalho desafiante com ML em produção.",
  },
  {
    name: "Critical Software",
    description: "Software engineering company specializing in mission-critical systems for aerospace, defense, and transportation sectors.",
    logoUrl: null,
    website: "https://www.criticalsoftware.com",
    location: "Coimbra, Portugal",
    industry: "Enterprise Software",
    companySize: "1000+",
    notes: "Empresa mais tradicional. Boa para ganhar experiência em sistemas críticos.",
  },
  {
    name: "Landing.Jobs",
    description: "Tech recruitment platform connecting developers with European companies. Also provides career resources and job matching services.",
    logoUrl: null,
    website: "https://landing.jobs",
    location: "Lisboa, Portugal",
    industry: "HR Tech",
    companySize: "10-50",
    notes: "Startup pequena. Bom para quem quer crescer rápido e ter ownership.",
  },
];

// Dados dummy para applications
// Não defino o companyId aqui porque obtenho-lo a partir
// dos registos inseridos das companies
const dummyApplications = [
  {
    position: "Backend Developer",
    status: "applied",
    notes: "Candidatura via LinkedIn. Stack: Node.js, PostgreSQL. Primeira ronda é coding challenge.",
  },
  {
    position: "Fullstack Developer",
    status: "interview",
    notes: "Primeira entrevista marcada para dia 20. Pesquisar sobre a plataforma Blip antes.",
  },
  {
    position: "Backend Developer",
    status: "rejected",
    notes: "Feedback: pouca experiência em Scala. Foi honesto e rápido no processo.",
  },
  {
    position: "Software Engineer",
    status: "applied",
    notes: "Processo longo típico de empresa grande. Expect 4-6 semanas.",
  },
  {
    position: "Junior Developer",
    status: "offer",
    notes: "Proposta recebida - 28k/ano. A considerar. Equity package incluído.",
  },
];

const seed = async () => {
  try {
    console.log("Seeding database...");

    // Inserir companies primeiro
    // O returning() devolve os registos completos com os IDs gerados
    console.log("Inserting companies...");
    const insertedCompanies = await db
      .insert(companies)
      .values(dummyCompanies)
      .returning();

    console.log(`Inserted ${insertedCompanies.length} companies`);

    // Inserir applications, linkando cada uma à company correta
    // Aqui utilizo os IDs que acabei de receber do insert anterior
    console.log("Inserting applications...");
    const applicationsWithCompanyIds = dummyApplications.map((app, index) => ({
      ...app,
      companyId: insertedCompanies[index].id, // ligo cada application à company correspondente
    }));

    const insertedApplications = await db
      .insert(applications)
      .values(applicationsWithCompanyIds)
      .returning();

    console.log(`Inserted ${insertedApplications.length} applications`);
    console.log("Seeding completed successfully!");

  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
};

// Executa o seed
seed();