import { mysqlTable, uniqueIndex, varchar } from "drizzle-orm/mysql-core";

export const usersTable = mysqlTable(
    "users",
    {
        id: varchar("id", { length: 60 }).primaryKey(),
        cvFileName: varchar("cv_file", { length: 128 }).notNull(),
        questionsFileName: varchar("questions_file", { length: 128 }).notNull(),
        videoOne: varchar("vid_one_file", { length: 128 }).notNull(),
        videoTwo: varchar("vid_two_file", { length: 128 }).notNull(),
        videoThree: varchar("vid_three_file", { length: 128 }).notNull(),
        step: varchar("step", {
            length: 128,
            enum: ["cv", "one", "two", "three", "result", "loading"],
        }).notNull(),
    },
    (user) => ({
        idIndex: uniqueIndex("id_idx").on(user.id),
    })
);
