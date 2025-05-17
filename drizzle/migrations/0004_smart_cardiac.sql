ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "firstName" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastName" varchar(50);