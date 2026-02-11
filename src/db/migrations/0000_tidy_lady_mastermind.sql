CREATE TABLE "applications" (
	"id" serial PRIMARY KEY NOT NULL,
	"position" varchar(255) NOT NULL,
	"status" varchar(50) DEFAULT 'applied' NOT NULL,
	"application_date" timestamp DEFAULT now() NOT NULL,
	"notes" text,
	"company_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" varchar(1000),
	"logo_url" varchar(512),
	"website" varchar(255),
	"location" varchar(255),
	"industry" varchar(100),
	"company_size" varchar(50),
	"notes" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "companies_name_unique" UNIQUE("name")
);
--> statement-breakpoint
ALTER TABLE "applications" ADD CONSTRAINT "applications_company_id_companies_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("id") ON DELETE no action ON UPDATE no action;