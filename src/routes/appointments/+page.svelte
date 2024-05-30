<script lang="ts">
	import { enhance } from '$app/forms';
	import Calendar from '$lib/components/Calendar.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';
	import { goto } from '$app/navigation';
	import RescheduleModal from '$lib/components/RescheduleModal.svelte';

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
		let studentName = appointment.user.name;
		let studentID = appointment.user.studentId;
		let title = studentID + ' ' + studentName + ' - ' + serviceName || appointment.service;
		return {
			id: appointment.id,
			title: title,
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
		} else if (action === 'billing') {
			console.log('billing: ' + id);
			//goto('/appointment/' + id);
			//openModal(id);
		}
		else if(action === 'done'){
			//mark the appointment as "done"
		}
	}

	function updateTime(e: CustomEvent) {
		let id = e.detail.id;
		let start = e.detail.start;
		let day = e.detail.day;
		console.log('update appointment id: ' + id);
		console.log('update appointment start: ' + start);
		//only works if it isnt friday or thursday
		if (day != 'Thursday' && day != 'Friday') {
			updateAppointment(id, start);
		}
	}

	//im getting the available times from data.availableTimes
	//show this in front end

	let availableTimes = data.availableTimes;

	const cancelAppointment = async (id: string) => {
		try {
			const res = await fetch('/api/appointment/' + id, {
				method: 'DELETE'
			});
			const data = await res.json();
			console.log(data);
			if (data.message === 'something') {
				goto('/appointments');
			}
		} catch (err) {
			console.log(err);
		}
	};

	const updateAppointment = async (id: string, start: string) => {
		try {
			const res = await fetch('/api/appointment/' + id, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ start: start })
			});
			const data = await res.json();
			console.log(data);
			if (data.message === 'something') {
				goto('/appointments');
			}
		} catch (err) {
			console.log(err);
		}
	};



	function openModal(id: any) {}
</script>

<!--RescheduleModal parent={s}/-->
<!--Hide available times within an accordion-->
<Accordion>
	<AccordionItem>
		<svelte:fragment slot="summary">
			<h2 class="text-2xl font-bold mb-2.5">Available Time Slots Today</h2>
		</svelte:fragment>
		<svelte:fragment slot="content">
			{#each availableTimes as time}
				<div class="flex justify-center">
					<div class="w-full sm:w-3/5 md:w-1/3">
						<div class="flex justify-between">
							<span>{time}</span>
						</div>
					</div>
				</div>
			{/each}
		</svelte:fragment>
	</AccordionItem>
</Accordion>

<h1 class="text-2xl font-bold mb-2.5 pl-4">Appointments</h1>

<Calendar classevents={classEvents} faculty={true} on:buttonClick={handleEventClick} on:dragEnd={updateTime} />
