import type { LayoutServerLoad } from './$types'
import prisma from "$lib/server/prisma";

export const load: LayoutServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (session) {
        //find the department of the user
        const department = await prisma.user.findUnique(

            {
                where: {
                    id: session.user.userId
                },
                select: {
                    department: true
                }
            }
        );

        let faculty = department?.department === 'faculty' ? true : false;



        return { user: session.user.userId, faculty: faculty };

        //return {user: session.user.userId };
    }
}

