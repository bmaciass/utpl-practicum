CREATE TYPE "public"."InstitutionGovernanceLevel" AS ENUM('nacional');--> statement-breakpoint
CREATE TYPE "public"."InstitutionArea" AS ENUM('educacion');--> statement-breakpoint
CREATE TABLE "Institution" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(128) NOT NULL,
	"uid" varchar(64) DEFAULT uuid_generate_v4() NOT NULL,
	"area" "InstitutionArea" NOT NULL,
	"level" "InstitutionGovernanceLevel" NOT NULL,
	"createdBy" varchar NOT NULL,
	"updatedBy" varchar,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "Institution_uid_unique" UNIQUE("uid")
);
--> statement-breakpoint
CREATE TABLE "Person" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(64) NOT NULL,
	"lastName" varchar(64) NOT NULL,
	"dni" varchar(15) NOT NULL,
	"uid" varchar(64) DEFAULT uuid_generate_v4() NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "Person_uid_unique" UNIQUE("uid")
);
--> statement-breakpoint
CREATE TABLE "User" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"uid" varchar(64) DEFAULT uuid_generate_v4() NOT NULL,
	"personUid" varchar NOT NULL,
	"password" varchar(512) NOT NULL,
	"salt" varchar(512) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "User_name_unique" UNIQUE("name"),
	CONSTRAINT "User_uid_unique" UNIQUE("uid")
);
--> statement-breakpoint
ALTER TABLE "Institution" ADD CONSTRAINT "Institution_createdBy_Person_uid_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."Person"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Institution" ADD CONSTRAINT "Institution_updatedBy_Person_uid_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."Person"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "User" ADD CONSTRAINT "User_personUid_Person_uid_fk" FOREIGN KEY ("personUid") REFERENCES "public"."Person"("uid") ON DELETE no action ON UPDATE no action;