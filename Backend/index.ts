import { PrismaClient } from '@prisma/client';
import { enhance, type auth } from '@zenstackhq/runtime';
import { createHonoHandler } from '@zenstackhq/server/hono';
import { type Context, Hono } from 'hono';
import { RestApiHandler } from '@zenstackhq/server/api';



const prisma = new PrismaClient();
const app = new Hono();

const handler = RestApiHandler({ endpoint: 'http://localhost:3000/api/model' });

app.use(
    '/api/model/*',
    createHonoHandler({
        handler,
        getPrisma: (ctx) => {
            return enhance(prisma, { user: getCurrentUser(ctx) });
        },
    })
);


function getCurrentUser(ctx: Context): auth.User {
    // the implementation depends on your authentication mechanism

    return { id: BigInt(1) }
}

export default {
    port: 3000,
    fetch: app.fetch,
} 