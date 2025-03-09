import { verify } from 'hono/jwt'
import type { User } from '@prisma/client';
import type { auth } from "@zenstackhq/runtime";

import type { Context } from "hono";
import { getCookie } from 'hono/cookie';

export async function getCurrentUser(ctx: Context): Promise<auth.User | undefined> {
    try {
        const data = getCookie(ctx, "X-TOKEN")

        if (!data) throw Error("Empty Header")

        const result = await verify(data, process.env.JWT_TOKEN ?? "2BORNOT2B")

        if (!("payload" in result)) throw Error("Bad token")

        return result.payload as User
    } catch (error) {
        console.error(error)
        return
    }
}
