import { json } from '@sveltejs/kit';
import { auth } from "$lib/server/lucia";
import { type } from 'os';
import prisma from "$lib/server/prisma";
export const POST = async ({ request, locals }) => {
    const form = await request.json();
/*
let returnObj = {
	studentID: '',
	notes: '',
	arr: [
		{
			drug: '',
			dosage: '',
			frequency: '',
		},
	],
}
*/
    const studentID = form.studentID;
    const notes = form.notes;
    const arr = form.arr;
  
    try {
        const id = await prisma.user.findUnique({
            where: {
                studentId: studentID
            },
            select: {   
                id: true
            }
        });
        console.log(id + " found");
        const prescription = await prisma.prescription.create({
            data: {
                userId: id,
                notes: notes,
                arr: arr,
            }
        });
        console.log(prescription + "created");


        return json({ message: 'Prescription created' }, { status: 201 });
    }
    catch (err) {
        console.error(err)
        return json({ message: 'Cannot create auth user' }, { status: 500 });
    }
}