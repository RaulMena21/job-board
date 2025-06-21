CREATE TYPE "public"."job_listing_experience_level" AS ENUM('junior', 'mid', 'senior');--> statement-breakpoint
CREATE TYPE "public"."job_listing_status" AS ENUM('published', 'delisted', 'draft');--> statement-breakpoint
CREATE TYPE "public"."job_listing_type" AS ENUM('full-time', 'part-time', 'internship');--> statement-breakpoint
CREATE TYPE "public"."job_listing_location_requirement" AS ENUM('remote', 'on-site', 'hybrid');--> statement-breakpoint
CREATE TYPE "public"."job_listing_wage_interval" AS ENUM('hourly', 'monthly', 'yearly');--> statement-breakpoint
CREATE TYPE "public"."job_listing_application_status" AS ENUM('applied', 'interviewing', 'interested', 'rejected', 'hired');--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"imgUrl" varchar NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "job_listings" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"organizationId" varchar NOT NULL,
	"title" varchar NOT NULL,
	"description" text NOT NULL,
	"wage" integer,
	"wageInterval" "job_listing_wage_interval",
	"stateAbreviation" varchar,
	"city" varchar,
	"isFeatured" boolean DEFAULT false NOT NULL,
	"locationRequirement" "job_listing_location_requirement" NOT NULL,
	"experienceLevel" "job_listing_experience_level" NOT NULL,
	"status" "job_listing_status" NOT NULL,
	"type" "job_listing_type" NOT NULL,
	"postedAt" timestamp with time zone,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "job_listing_applications" (
	"job_listing_id" uuid NOT NULL,
	"userId" varchar NOT NULL,
	"coverLetter" text,
	"rating" integer,
	"stage" "job_listing_application_status" DEFAULT 'applied' NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "job_listing_applications_job_listing_id_userId_pk" PRIMARY KEY("job_listing_id","userId")
);
--> statement-breakpoint
CREATE TABLE "organizations" (
	"id" varchar PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"imgUrl" varchar,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "organization_user_settings" (
	"userId" varchar NOT NULL,
	"newJobEmailNotifications" boolean DEFAULT false NOT NULL,
	"aiPrompt" varchar,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_resumes" (
	"userId" varchar PRIMARY KEY NOT NULL,
	"resumeFileUrl" varchar NOT NULL,
	"resumeFileKey" varchar NOT NULL,
	"aiSummary" varchar,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "job_listings" ADD CONSTRAINT "job_listings_organizationId_organizations_id_fk" FOREIGN KEY ("organizationId") REFERENCES "public"."organizations"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_listing_applications" ADD CONSTRAINT "job_listing_applications_job_listing_id_job_listings_id_fk" FOREIGN KEY ("job_listing_id") REFERENCES "public"."job_listings"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "job_listing_applications" ADD CONSTRAINT "job_listing_applications_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "organization_user_settings" ADD CONSTRAINT "organization_user_settings_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_resumes" ADD CONSTRAINT "user_resumes_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "job_listings_stateAbreviation_index" ON "job_listings" USING btree ("stateAbreviation");