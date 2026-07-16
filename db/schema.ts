import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const learners = sqliteTable("learners", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  department: text("department").notNull().default("General"),
  skillLevel: text("skill_level").notNull().default("Beginner"),
  status: text("status").notNull().default("active"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const assignments = sqliteTable("assignments", {
  id: text("id").primaryKey(),
  learnerId: text("learner_id").notNull().references(() => learners.id),
  courseId: text("course_id").notNull().default("intro-101"),
  dueDate: text("due_date"),
  status: text("status").notNull().default("assigned"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const completions = sqliteTable("completions", {
  id: text("id").primaryKey(),
  learnerId: text("learner_id").notNull().references(() => learners.id),
  courseId: text("course_id").notNull().default("intro-101"),
  score: integer("score").notNull(),
  certificateId: text("certificate_id").notNull().unique(),
  completedAt: integer("completed_at", { mode: "timestamp" }).notNull(),
});

export const organizationSettings = sqliteTable("organization_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});
