ALTER TABLE "Project" RENAME COLUMN "responsible" TO "responsibleUid";--> statement-breakpoint
ALTER TABLE "Project" DROP CONSTRAINT "Project_responsible_User_uid_fk";
--> statement-breakpoint
ALTER TABLE "Project" ADD CONSTRAINT "Project_responsibleUid_User_uid_fk" FOREIGN KEY ("responsibleUid") REFERENCES "public"."User"("uid") ON DELETE no action ON UPDATE no action;