import { enhance, type auth } from '@zenstackhq/runtime';
import { createHonoHandler } from '@zenstackhq/server/hono';
import { type Context, Hono } from 'hono';
import { RestApiHandler } from '@zenstackhq/server/api';
import prisma from './prisma';
import { getCurrentUser } from './routes/auth';
import loginHandler from './routes/login';
import logoutHandler from './routes/logout';

declare global {
    interface BigInt {
        /** Convert to BigInt to string form in JSON.stringify */
        toJSON: () => string;
    }
}

BigInt.prototype.toJSON = function () {
    return this.toString();
};


const app = new Hono();

const handler = RestApiHandler({ endpoint: 'http://localhost:3000/api/model' });


app.post("/api/model/login", loginHandler)
app.post("/api/model/logout", logoutHandler)


app.use(
    '/api/model/*',
    createHonoHandler({
        handler,
        getPrisma: async (ctx) => {
            return enhance(prisma, { user: await getCurrentUser(ctx) });
        },
    })
);

export default {
    port: 3000,
    fetch: app.fetch,
} 