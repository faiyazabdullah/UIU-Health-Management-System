<script>
	import { goto } from '$app/navigation';
	// import type { PageData } from "./$types";

	export let data; //: PageData;
	//    data.userInfo.studentId could be null. So, we need to handle that case

	let studentID = data.userInfo?.studentId ?? '000000000';
	let minDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
	let selectedDate = minDate; // Set the selected date to today's date
	/**
	 * @type {any[]}
	 */
	let availableTimes = ['-'];
	let errorMsg = 'Choose a date';

	// @ts-ignore
	const handleDateChange = async (event) => {
		const selectedDate = new Date(event.target.value);
		const selectedDay = selectedDate.getDay();
		//console.log(event.target.value);
		// Restrict selection for Thursday (4) and Friday (5)
		if (selectedDay === 4 || selectedDay === 5) {
			// If the selected date is Thursday or Friday, prevent further action
			errorMsg = 'Closed on Thursday & Friday';
			availableTimes = ['-'];
			return;
		}

		// Continue with your backend logic for fetching available times
		try {
			const response = await fetch(`/api/available-times/${event.target.value}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});

			const data = await response.json();
			if (response.ok) {
				availableTimes = data.message;
				errorMsg = 'Available Hours';
			} else {
				console.error('Failed to fetch available times:', data.message);
				// Handle error scenarios, if needed
			}
		} catch (error) {
			console.error('Error fetching available times:', error);
			// Handle fetch error
		}
	};

	const appointmentInfo = {
		service: 'Ck',
		date: minDate,
		time: '-',
		payment: '1',
		studentID: studentID
	};

	// @ts-ignore
	const createAppointment = async (event) => {
		event.preventDefault();
		//extractStudentID();

		const res = await fetch('/api/appointment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(appointmentInfo)
		});

		try {
			const data = await res.json();
			console.log(data);
			if (data.message === 'something') {
				goto('/');
			}
		} catch (err) {
			console.log(err);
		}
	};

	let disabled = true;
	//disabled is false if available hours isnt ['-']
	$: disabled = availableTimes[0] === '-';
	//console.log(disabled);
</script>

<div class="flex justify-center">
	<div class="w-full sm:w-3/5 md:w-1/3">
		<h1 class="text-2xl font-bold mb-2.5">Make an Appointment</h1>
		<form>
			<span>Service</span>
			<select
				class="select variant-form-material"
				name="service"
				bind:value={appointmentInfo.service}
			>
				<option value="Ck">Checkup</option>
				<option value="Rx">Prescription</option>
				<option value="Bp">Blood Pressure</option>
				<option value="Wt">Weight Measure</option>
				<option value="Fw">Follow Up</option>
				<option value="C">Consultation</option>
				<option value="E">Emergency</option>
				<option value="S">Seasonal (asthma)</option>
				<option value="Tp">Temperature</option>
			</select>
			<span>When?</span>
			<input
				type="date"
				class="select variant-form-material"
				min={minDate}
				on:change={handleDateChange}
				name="date"
				bind:value={appointmentInfo.date}
			/>
			<!--span class="text-red-500">{errorMsg}</span>
            turn the span red only if the user selects Thursday or Friday
            -->
			{#if disabled}
				<span class="text-red-500">{errorMsg}</span>
			{:else}
				<span class="text-green-500">{errorMsg}</span>
			{/if}

			<select class="select variant-form-material" name="time" bind:value={appointmentInfo.time}>
				{#each availableTimes as time}
					<option value={time}>{time}</option>
				{/each}
			</select>

			<span>Payment Method</span>
			<select
				class="select variant-form-material"
				name="payment"
				bind:value={appointmentInfo.payment}
			>
				<option value="1">In-Person</option>
				<option value="2">Bkash</option>
			</select>
			<input type="hidden" name="studentID" bind:value={studentID} />
			{#if disabled}
				<button class="btn btn-sm variant-filled-secondary" type="submit" disabled
					>Make Appointment</button
				>
			{:else}
				<button
					class="btn btn-sm variant-filled-secondary"
					type="submit"
					on:click={createAppointment}>Make Appointment</button
				>
			{/if}
		</form>
	</div>
</div>
