import { json } from "@sveltejs/kit";
import prisma from "$lib/server/prisma";
export const DELETE = async ({ request, locals , params }) => {
    const id = parseInt(params.id);
    try {
        const appointment = await prisma.appointment.delete({
            where: {
                id: id
            }

        });
        console.log(appointment + "deleted");

    } catch (err) {
        console.error(err);
        return json({ message: 'Cannot delete appointment' }, { status: 500 });
    }
    return json({ message: 'something' }, { status: 201 });
}
//update
/*
const res = await fetch('/api/appointment/' + id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({start: start})
			});

*/
//i only have to change the start time for a given appointment
// i get the id from the params
// i get the start time from the body
// i update the appointment with the id with the start time
export const PUT = async ({ request, locals , params }) => {
    const id = parseInt(params.id);
    const form = await request.json();
    const start = form.start;
    console.log(
        "Here's the information I got: " + id + " " + start + "\n"

    );
    if(isDateInPast(start)){
        return json({ message: 'Cannot update appointment' }, { status: 500 });
    }
    try {
        const appointment = await prisma.appointment.update({
            where: {
                id: id
            },
            data: {
                time: formatTime(start),
                date: formatDate(start)
            }

        });
        console.log(appointment + "updated");

    } catch (err) {
        console.error(err);
        return json({ message: 'Cannot update appointment' }, { status: 500 });
    }
    return json({ message: 'something' }, { status: 201 });
}
function formatDate(inputDateString: string){
    //get date object
    const date = new Date(inputDateString);
    //turn it into 2023-12-09 format (YYYY-mm-dd) string
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;

}

function isDateInPast(inputDateString: string) {
    // Get the date object from the input date string
    const date = new Date(inputDateString);

    // Get the current date object
    const currentDate = new Date();

    // Determine if the date is in the past
    const isInPast = date < currentDate;

    return isInPast;
}


function formatTime(inputDateString: string) {
    const date = new Date(inputDateString);

    // Get the hours and minutes from the date
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Convert the 24-hour format to 12-hour format
    let formattedHours = hours % 12;
    formattedHours = formattedHours === 0 ? 12 : formattedHours; // Handle midnight (0 hours)

    // Determine if it's AM or PM
    const period = hours < 12 ? 'AM' : 'PM';

    // Format the minutes to have leading zeros if needed
    const formattedMinutes = String(minutes).padStart(2, '0');

    // Create the final formatted time string
    const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;

    return formattedTime;
}