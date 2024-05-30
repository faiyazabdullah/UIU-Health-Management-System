import { json } from '@sveltejs/kit';
import { auth } from "$lib/server/lucia";
import { type } from 'os';

export const POST = async ({ request, locals }) => {
    const form = await request.json();

    const username = form.username;
    const password = form.password;
    const email = form.email;
    const phone = form.phone;
    const studentId = form.studentId;

    const name = form.name;
    const department = form.department;
    const dob = form.dob;

    //console.log(form);
    if (typeof username !== 'string' || typeof password !== 'string' || typeof email !== 'string') {
        return json({ message: 'Invalid request' }, { status: 400 });
    }
    try {

        const user = await auth.createUser({
            key: {
                providerId: 'username',
                providerUserId: username.toLowerCase(),
                password: password
            },
            attributes: {
                username: username,
                email: email,
                phone: phone,
                studentId: studentId,
                name: name,
                department: department,
                //dob: dob
            }
        });
        console.log(user);

        const session = await auth.createSession({
            userId: user.userId,
            attributes: {}
        });


        locals.auth.setSession(session);

        return json({ message: 'User created' }, { status: 201 });
    }
    catch (err) {
        console.error(err)
        return json({ message: 'Cannot create auth user' }, { status: 500 });
    }
}