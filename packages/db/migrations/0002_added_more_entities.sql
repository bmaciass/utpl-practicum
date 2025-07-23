CREATE TYPE "public"."ProjectStatus" AS ENUM('pending', 'in_progress', 'done', 'cancelled');--> statement-breakpoint
CREATE TYPE "public"."ProjectGoalStatus" AS ENUM('pending', 'in_progress', 'done', 'cancelled');--> statement-breakpoint
CREATE TABLE "InstitutionEstrategicObjetive" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"uid" varchar(64) DEFAULT uuid_generate_v4() NOT NULL,
	"institutionUid" varchar,
	"startDate" date,
	"endDate" date,
	"createdBy" varchar NOT NULL,
	"updatedBy" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "InstitutionEstrategicObjetive_uid_unique" UNIQUE("uid")
);
--> statement-breakpoint
CREATE TABLE "InstitutionalPlan" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"uid" varchar(64) DEFAULT uuid_generate_v4() NOT NULL,
	"year" smallint NOT NULL,
	"version" smallint NOT NULL,
	"url" varchar NOT NULL,
	"institutionUid" varchar NOT NULL,
	"createdBy" varchar NOT NULL,
	"updatedBy" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "InstitutionalPlan_uid_unique" UNIQUE("uid")
);
--> statement-breakpoint
CREATE TABLE "Program" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"uid" varchar(64) DEFAULT uuid_generate_v4() NOT NULL,
	"description" text,
	"responsibleUid" varchar NOT NULL,
	"startDate" date,
	"endDate" date,
	"createdBy" varchar NOT NULL,
	"updatedBy" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "Program_uid_unique" UNIQUE("uid")
);
--> statement-breakpoint
CREATE TABLE "Project" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"uid" varchar(64) DEFAULT uuid_generate_v4() NOT NULL,
	"description" text,
	"status" "ProjectStatus" DEFAULT 'pending' NOT NULL,
	"startDate" date,
	"endDate" date,
	"responsible" varchar NOT NULL,
	"programUid" varchar,
	"createdBy" varchar NOT NULL,
	"updatedBy" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "Project_uid_unique" UNIQUE("uid")
);
--> statement-breakpoint
CREATE TABLE "ProjectGoal" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"uid" varchar(64) DEFAULT uuid_generate_v4() NOT NULL,
	"projectUid" varchar,
	"status" "ProjectGoalStatus" DEFAULT 'pending' NOT NULL,
	"startDate" date,
	"endDate" date,
	"createdBy" varchar NOT NULL,
	"updatedBy" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "ProjectGoal_uid_unique" UNIQUE("uid")
);
--> statement-breakpoint
ALTER TABLE "InstitutionEstrategicObjetive" ADD CONSTRAINT "InstitutionEstrategicObjetive_institutionUid_Institution_uid_fk" FOREIGN KEY ("institutionUid") REFERENCES "public"."Institution"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "InstitutionEstrategicObjetive" ADD CONSTRAINT "InstitutionEstrategicObjetive_createdBy_User_uid_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "InstitutionEstrategicObjetive" ADD CONSTRAINT "InstitutionEstrategicObjetive_updatedBy_User_uid_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "InstitutionalPlan" ADD CONSTRAINT "InstitutionalPlan_institutionUid_Institution_uid_fk" FOREIGN KEY ("institutionUid") REFERENCES "public"."Institution"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "InstitutionalPlan" ADD CONSTRAINT "InstitutionalPlan_createdBy_User_uid_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "InstitutionalPlan" ADD CONSTRAINT "InstitutionalPlan_updatedBy_User_uid_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Program" ADD CONSTRAINT "Program_responsibleUid_User_uid_fk" FOREIGN KEY ("responsibleUid") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Program" ADD CONSTRAINT "Program_createdBy_User_uid_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Program" ADD CONSTRAINT "Program_updatedBy_User_uid_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Project" ADD CONSTRAINT "Project_responsible_User_uid_fk" FOREIGN KEY ("responsible") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Project" ADD CONSTRAINT "Project_programUid_Program_uid_fk" FOREIGN KEY ("programUid") REFERENCES "public"."Program"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Project" ADD CONSTRAINT "Project_createdBy_User_uid_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Project" ADD CONSTRAINT "Project_updatedBy_User_uid_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectGoal" ADD CONSTRAINT "ProjectGoal_projectUid_Project_uid_fk" FOREIGN KEY ("projectUid") REFERENCES "public"."Project"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectGoal" ADD CONSTRAINT "ProjectGoal_createdBy_User_uid_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "ProjectGoal" ADD CONSTRAINT "ProjectGoal_updatedBy_User_uid_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;