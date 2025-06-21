import { use } from "react";
import { createdAt, updatedAt } from "../schemaHelpers";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { userTable } from "./user";
import { relations } from "drizzle-orm";

export const userResumeTable = pgTable("user_resumes", {
    userId: varchar().notNull().primaryKey().references(() => userTable.id, { onDelete: "cascade" }),
    resumeFileUrl: varchar().notNull(),
    resumeFileKey: varchar().notNull(),
    aiSummary: varchar(),
    createdAt,
    updatedAt,
},)

export const userResumeRelations = relations(userResumeTable, ({ one }) => ({
    user: one(userTable, {
        fields: [userResumeTable.userId],
        references: [userTable.id],
    }),
    }))
    