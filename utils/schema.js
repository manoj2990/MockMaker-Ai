import { pgTable, serial, text, varchar,timestamp } from "drizzle-orm/pg-core";


export const MockInterview = pgTable('mockInterview',
    {
        id: serial('id').primaryKey(),
        mockId: varchar('mockId').notNull(),
        jsonMockResp: text('jsonMockResp').notNull(),
        jobPosition: varchar('jobPosition').notNull(),
        jobDesc: varchar('jobDesc').notNull(),
        jobExperience: varchar('jobExperience').notNull(),
        createdBy: varchar('createdBy').notNull(),
        createdAt: varchar('createdAt')
    }
)


export const UserAnswer = pgTable('userAnswer', 
    {
        id: serial('id').primaryKey(),
        mockIdRef: varchar('mockId').notNull(),
        question: varchar('question').notNull(),
        correctAns: text('correctAns'),
        userAns: text('userAns'),
        feedback: text('feedback'),
        rating: varchar('rating'),
        userEmail: varchar('userEmail'),
        createdAt: varchar('createdAt')
    });


export const subscriptions = pgTable("subscriptions", {
    id: serial('id').primaryKey(), 
    userId: varchar("userId").unique().notNull(),
    userEmail: varchar('userEmail').unique().notNull(),
    planStatus: text("planStatus").notNull().default("free"), // Default to free plan
    createdAt: timestamp("createdAt").defaultNow(),
});
