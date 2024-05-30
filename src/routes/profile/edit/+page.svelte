<script>
	let name = '';
	let phoneNumber = '';
	let picture = '';

	function handleSubmit() {
		// Handle form submission
		console.log('Name:', name);
		console.log('Phone Number:', phoneNumber);
		console.log('Picture:', picture);
	}
</script>

<h1>Edit Profile</h1>

<form on:submit={handleSubmit}>
	<label for="name">Name:</label>
	<input type="text" id="name" bind:value={name} />

	<label for="phoneNumber">Phone Number:</label>
	<input type="tel" id="phoneNumber" bind:value={phoneNumber} />

	<label for="picture">Picture:</label>
	<input type="file" id="picture" bind:value={picture} />

	<button class="btn btn-sm variant-filled-secondary" type="submit">Save</button>
</form>
