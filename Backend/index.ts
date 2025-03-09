import { PrismaClient } from '@prisma/client';
import { enhance, type auth } from '@zenstackhq/runtime';
import { createHonoHandler } from '@zenstackhq/server/hono';
import { type Context, Hono } from 'hono';

const prisma = new PrismaClient();
const app = new Hono();

app.use(
    '/api/model/*',
    createHonoHandler({
        getPrisma: (ctx) => {
            return enhance(prisma, { user: getCurrentUser(ctx) });
        },
    })
);


function getCurrentUser(ctx: Context): auth.User {
    // the implementation depends on your authentication mechanism

    return { id: 1 }
}

export default {
    port: 3000,
    fetch: app.fetch,
} 