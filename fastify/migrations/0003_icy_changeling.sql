ALTER TYPE "sub_status" ADD VALUE 'paused';
ALTER TABLE "subscriptions" ADD COLUMN "sub_tier" varchar(255);