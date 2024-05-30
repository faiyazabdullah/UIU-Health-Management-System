import { json } from '@sveltejs/kit';
import prisma from "$lib/server/prisma";
export const GET = async ({ request, locals, params }) => {
    //const form = await request.json();
    let date = params.date;


    console.log(date);

    //return json({ message: 'something' }, { status: 201 });

    try {
        const takenTimeSlots = await prisma.appointment.findMany({
            where: {
                date: date
            }
        });
        //console.log(takenTimeSlots);

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

        let availableTimeSlots = defaultTimes.filter((time) => {
            return !takenTimeSlots.some((takenTimeSlot) => {
                return takenTimeSlot.time === time;
            });
        });


        return json({ message: availableTimeSlots }, { status: 201 });
    }
    catch (err) {
        console.error(err)
        return json({ message: 'Error' }, { status: 500 });
    }

}