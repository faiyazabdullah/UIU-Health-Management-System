import { redirect } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate();
    if (!session) throw redirect(302, "/login");
    console.log(session.user);
    const userInfo = await prisma.user.findUnique({
        where: { id: session.user.userId },
    })
    const appointments = await prisma.appointment.findMany(
        {
            include: {
                user: {
                    select: {
                        name: true,
                        studentId: true,
                    }
                }
            },
            where: {
                updated: false,
            }
        }
    )
    let currentDate = new Date();
    let currentDateStr = currentDate.toISOString().slice(0, 10);
    console.log(currentDateStr);
    let availableTimes = [];

    const takenTimeSlots = await prisma.appointment.findMany({
        where: {
            date: currentDateStr
        }
    });

    let defaultTimes = [
        "8:30 AM",
        "9:00 AM",
        "9:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "1:00 PM",
        "1:30 PM",
        "2:00 PM",
        "2:30 PM",
        "3:00 PM",
        "3:30 PM",
        "4:00 PM"
    ];

    availableTimes = defaultTimes.filter((time) => {
        return !takenTimeSlots.some((takenTimeSlot) => {
            return takenTimeSlot.time === time;
        });
    });







    console.log(availableTimes);
    return {
        userInfo: userInfo,
        appointments: appointments,
        availableTimes: availableTimes,
    };
};