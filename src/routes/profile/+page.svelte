<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Calendar from '$lib/components/Calendar.svelte';

	import type { PageData } from './$types';

	export let data: PageData;
	let appointments = data.appointments;
	let serviceNames = {
		Ck: 'Checkup',
		Rx: 'Prescription',
		Bp: 'Blood Pressure',
		Wt: 'Weight Measure',
		Fw: 'Follow Up',
		C: 'Consultation',
		E: 'Emergency',
		S: 'Seasonal (asthma)',
		Tp: 'Temperature'
	};

	let classEvents = appointments.map((appointment) => {
		// Convert date and time to ISO 8601 format
		let startTime = new Date(`${appointment.date} ${appointment.time}`).toISOString();

		// Calculate the end time by adding 30 minutes to the start time
		let endTime = new Date(new Date(startTime).getTime() + 30 * 60000).toISOString(); // 30 minutes in milliseconds
		let serviceName = serviceNames[appointment.service];
		return {
			title: serviceName || appointment.service,
			start: startTime,
			end: endTime
		};
	});


	function handleEventClick(e: CustomEvent) {
		let action = e.detail.action;
		let id = e.detail.id;
		if (action === 'cancel') {
			console.log('cancel appointment id: ' + id);
			cancelAppointment(id);

		} else if (action === 'reschedule') {
			console.log('reschedule appointment id: ' + id);
		}
	}

	const cancelAppointment = async (id: string) => {
		try {
			const res = await fetch('/api/appointment/' + id, {
				method: 'DELETE'
			});
			const data = await res.json();
			console.log(data);
			if (data.message === 'something') {
				goto('/profile');
			}
		} catch (err) {
			console.log(err);
		}
	};
</script>

<p>Student ID: {data?.userInfo?.studentId}</p>
<p>Username: {data?.userInfo?.username}</p>
<p>Email: {data?.userInfo?.email}</p>
<p>Phone: {data?.userInfo?.phone}</p>

<a class="btn btn-sm variant-filled-secondary" href="profile/edit">Edit</a>
<h1 class="text-2xl font-bold mb-2.5">Appointments</h1>
{#each appointments as appointment}
	<div class="card">
		<p class="font-bold">{serviceNames[appointment.service]}</p>
		<p>Date: {appointment.date}</p>
		<p>Time: {appointment.time}</p>
		<!--p>Payment: {appointment.payment}</p-->
	</div>
{/each}
<Calendar classevents={classEvents} on:buttonClick={handleEventClick}/>
