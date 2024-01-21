import {
    PLANETSCALE_DB_HOST,
    PLANETSCALE_DB_PASSWORD,
    PLANETSCALE_DB_USERNAME,
} from "$env/static/private";
import { connect } from "@planetscale/database";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { generateRandomString } from "gcs";
import { usersTable } from "./usersSchema";

const connection = connect({
    host: PLANETSCALE_DB_HOST,
    username: PLANETSCALE_DB_USERNAME,
    password: PLANETSCALE_DB_PASSWORD,
});

export const db = drizzle(connection);

export async function createState(userID: string) {
    const name = generateRandomString(20);
    await db.insert(usersTable).values({
        id: userID,
        desiredPosition: "",
        cvFileName: name,
        questionsFileName: name,
        videoOne: name + "-one",
        videoTwo: name + "-two",
        videoThree: name + "-three",
        step: "cv",
    });
}

export async function getState(userID: string | null | undefined) {
    if (!userID) return null;

    const res = await db.select().from(usersTable).where(eq(usersTable.id, userID)).limit(1);
    const state = res.at(0) ?? null;
    if (!state) {
        await createState(userID);
        return getState(userID);
    }
    return state;
}

export async function resetState(userID: string | null | undefined) {
    if (!userID) return null;
    await db.update(usersTable).set({ step: "cv" }).where(eq(usersTable.id, userID));
}

export async function setDesiredPosition(userID: string | null | undefined, pos: string) {
    if (!userID) return null;
    await db.update(usersTable).set({ desiredPosition: pos }).where(eq(usersTable.id, userID));
}

export type UserData = typeof usersTable.$inferSelect;
