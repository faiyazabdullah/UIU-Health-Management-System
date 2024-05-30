import { json } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";
export const POST = async ({ request, locals }) => {
    const form = await request.json();
    const service = form.service;
    const date = form.date;
    const time = form.time;
    //const payment = form.payment;
    const session = await locals.auth.validate();
    const userID = session.user.userId;

    try {
        const appointment = await prisma.appointment.create({
            data: {
                service: service,
                date: date,
                time: time,
                userId: userID
            }
        });
        console.log(appointment);

    } catch (err) {
        console.error(err);
        return json({ message: 'Cannot create appointment' }, { status: 500 });
    }
    return json({ message: 'something' }, { status: 201 });
}