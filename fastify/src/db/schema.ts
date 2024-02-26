import { relations } from 'drizzle-orm';
import {
  pgTable,
  pgEnum,
  uuid,
  varchar,
  timestamp,
  serial,
  boolean,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom().notNull(),
  email: varchar('email', { length: 255 }).unique().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
  subscriptions: many(subscriptions),
}));

export const profiles = pgTable('profiles', {
  profileId: serial('profile_id').primaryKey(),
  userId: uuid('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  userName: varchar('user_name', { length: 255 }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const subStatus = pgEnum('sub_status', [
  'trialing',
  'active',
  'canceled',
  'incomplete',
  'incomplete_expired',
  'past_due',
  'unpaid',
  'no_subscription',
]);

export const subscriptions = pgTable('subscriptions', {
  subId: serial('sub_id').primaryKey(),
  userId: uuid('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  stripeCustomerId: varchar('stripe_customer_id', { length: 255 }),
  stripeSubscriptionId: varchar('stripe_subscription_id', { length: 255 }),
  isActive: boolean('is_active').notNull().default(false),
  subStatus: subStatus('sub_status').notNull().default('no_subscription'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  cancelAtPeriodEnd: boolean('cancel_at_period_end').notNull().default(false),
  canceledAtDate: timestamp('canceled_at_date'),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.userId],
    references: [users.id],
  }),
}));
