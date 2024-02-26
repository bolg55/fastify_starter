DO $$ BEGIN
 CREATE TYPE "sub_status" AS ENUM('trialing', 'active', 'canceled', 'incomplete', 'incomplete_expired', 'past_due', 'unpaid', 'no_subscription');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

ALTER TABLE "subscriptions" ADD COLUMN "sub_status" "sub_status" DEFAULT 'no_subscription' NOT NULL;
ALTER TABLE "subscriptions" ADD COLUMN "cancel_at_period_end" boolean DEFAULT false NOT NULL;
ALTER TABLE "subscriptions" ADD COLUMN "canceled_at_date" timestamp;

CREATE OR REPLACE FUNCTION create_user_profile_subscription()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (user_id, created_at, updated_at)
  VALUES (NEW.id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

  INSERT INTO subscriptions (user_id, is_active, sub_status, created_at, updated_at)
  VALUES (NEW.id, FALSE, 'no_subscription', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER after_user_insert
AFTER INSERT ON users
FOR EACH ROW
EXECUTE FUNCTION create_user_profile_subscription();