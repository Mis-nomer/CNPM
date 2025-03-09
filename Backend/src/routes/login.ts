import type { Handler } from 'hono'

import { sign } from 'hono/jwt'
import prisma from '../prisma'
import type { User } from '@prisma/client'
import { setCookie } from 'hono/cookie'


function isUser(input: any): input is Partial<User> {
    return "password" in input && "email" in input
}

const loginHandler: Handler = async function (c) {
    let payload = await c.req.json()

    if (payload) payload = payload.data.attributes

    if (!isUser(payload)) {
        return c.json({
            message: "Bad payload",
            code: "403"
        })
    }

    const isValid = await prisma.user.findFirst({
        where: {
            email: {
                equals: payload.email
            },
            password: {
                equals: payload.password
            }
        }
    })

    if (!isValid) {
        return c.json({
            message: "Bad payload",
            code: "403"
        })
    }

    const token = await sign({
        payload: isValid,
        exp: Math.floor(Date.now() / 1000) + 60 * 10
    }, process.env.JWT_TOKEN ?? "2BORNOT2B")

    setCookie(c, "X-TOKEN", token)
    c.status(200)

    return c.json({
        message: "Login Success",
        code: "00"
    })
}

export default loginHandler