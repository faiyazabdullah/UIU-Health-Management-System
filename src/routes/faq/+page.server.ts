import prisma from "$lib/server/prisma";
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = (async () => {
    const faq = await prisma.faq.findMany({
    })

    return {
        faq
    };
});