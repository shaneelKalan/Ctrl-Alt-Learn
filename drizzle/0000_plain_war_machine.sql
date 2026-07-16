CREATE TABLE `assignments` (
	`id` text PRIMARY KEY NOT NULL,
	`learner_id` text NOT NULL,
	`course_id` text DEFAULT 'intro-101' NOT NULL,
	`due_date` text,
	`status` text DEFAULT 'assigned' NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `completions` (
	`id` text PRIMARY KEY NOT NULL,
	`learner_id` text NOT NULL,
	`course_id` text DEFAULT 'intro-101' NOT NULL,
	`score` integer NOT NULL,
	`certificate_id` text NOT NULL,
	`completed_at` integer NOT NULL,
	FOREIGN KEY (`learner_id`) REFERENCES `learners`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `completions_certificate_id_unique` ON `completions` (`certificate_id`);--> statement-breakpoint
CREATE TABLE `learners` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`department` text DEFAULT 'General' NOT NULL,
	`skill_level` text DEFAULT 'Beginner' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `learners_email_unique` ON `learners` (`email`);--> statement-breakpoint
CREATE TABLE `organization_settings` (
	`key` text PRIMARY KEY NOT NULL,
	`value` text NOT NULL,
	`updated_at` integer NOT NULL
);
