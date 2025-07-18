ALTER TABLE "Institution" DROP CONSTRAINT "Institution_createdBy_Person_uid_fk";
--> statement-breakpoint
ALTER TABLE "Institution" DROP CONSTRAINT "Institution_updatedBy_Person_uid_fk";
--> statement-breakpoint
ALTER TABLE "Institution" ADD CONSTRAINT "Institution_createdBy_User_uid_fk" FOREIGN KEY ("createdBy") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Institution" ADD CONSTRAINT "Institution_updatedBy_User_uid_fk" FOREIGN KEY ("updatedBy") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;