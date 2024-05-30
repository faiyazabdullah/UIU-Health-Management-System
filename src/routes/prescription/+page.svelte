
<script lang="ts">
	import PrescriptionTable from '$lib/components/PrescriptionTable.svelte';

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
returnObj.arr =	[{
        
		drug: 'Paracetamol',
		dosage: '100',
		frequency: 'every sunday',
	},
	{
	
		drug: 'Ritalin',
		dosage: '40',
		frequency: '2 per week',
	}]





	const createPrescription = async (e: Event) => {
		e.preventDefault();

		const res = await fetch('/api/prescription', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(returnObj)
		});

		try {
			const data = await res.json();
			console.log(data);
			if (data.message === 'Prescription created') {
				//goto('/login');
			}
		} catch (err) {
			console.log(err);
		}
	};



</script>


	<span>Student ID</span>
	<input
		type="text"
		class="select variant-form-material"
		name="studentID"
		placeholder="Enter Student ID" 
		bind:value = {returnObj.studentID}
	/>
	<input type="hidden" name="age" />
	<input type="hidden" name="prescriptionDate" />

	<PrescriptionTable  bind:value={returnObj.arr}/>

		
	<textarea class="textarea" rows="4" placeholder="Add any additional notes here... " bind:value = {returnObj.notes}/>
	<button class="btn btn-sm variant-filled-secondary" on:click={createPrescription}>Create Prescription</button>

