CREATE TABLE IF NOT EXISTS "subscriptions" (
	"id" serial NOT NULL,
	"user_id" uuid PRIMARY KEY NOT NULL,
	"stripe_customer_id" varchar(255),
	"stripe_subscription_id" varchar(255),
	"is_active" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);

ALTER TABLE "profiles" RENAME COLUMN "name" TO "user_name";
ALTER TABLE "profiles" DROP COLUMN IF EXISTS "stripe_customer_id";
DO $$ BEGIN
 ALTER TABLE "subscriptions" ADD CONSTRAINT "subscriptions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
