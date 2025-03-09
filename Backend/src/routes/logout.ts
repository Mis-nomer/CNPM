import type { Handler } from 'hono'
import { deleteCookie } from 'hono/cookie'


const logoutHandler: Handler = async function (c) {
    deleteCookie(c, "X-TOKEN")

    return c.json({
        message: "Successfully logged out"
    })
}

export default logoutHandler