import { auth } from "$lib/server/lucia";
import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
    const session = await locals.auth.validate()
    if (!session) {
        throw redirect(302, '/')

    }

    await auth.invalidateSession(session.sessionId)
    locals.auth.setSession(null)
    /*
    await prisma.user.update({
        where: { id: session.userId },
        data: { online: false }
    })
    */
    console.log(session.userId + " logged out");


    throw redirect(302, '/')
}