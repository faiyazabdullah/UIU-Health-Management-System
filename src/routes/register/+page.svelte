<script lang="ts">
	import { redirect } from '@sveltejs/kit';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import type { document } from 'postcss';
	import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
	let value: number = 0;
	let basicInfo = {
		username: 'taimur',
		email: 'taimur221427@bscse.uiu.ac.bd',
		password: '123',
		phone: '123',
		studentId: '011221427',
		name: 'Taimur Rahman',
		department: '011',
		dob: '1998-12-12'
	};

	const handleSignup = async (e: Event) => {
		e.preventDefault();

		if (value !== 0) {
			//basicInfo.studentId = basicInfo.department + basicInfo.studentId;
			basicInfo.studentId = basicInfo.phone + basicInfo.username;
			basicInfo.department = 'faculty';
		} else {
			extractStudentID();
		}
		const res = await fetch('/api/createUser', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(basicInfo)
		});

		try {
			const data = await res.json();
			console.log(data);
			if (data.message === 'User created') {
				goto('/login');
			}
		} catch (err) {
			console.log(err);
		}
	};

	function takeToLandingPg() {
		goto('/');
	}

	function extractStudentID() {
		//grab the ID from the email using regex?
		//example: trahman2016@uiu -> 2016
		const match = basicInfo.email.match(/(\d+)/);
		if (match) {
			//011 - BSCSE, 021 - BSEEE, 111 - BBA, 121 - BSECO,
			basicInfo.studentId = basicInfo.department + match[0];
		}
		basicInfo.studentId = match ? match[0] : '';
	}
</script>

<div class="flex justify-center">
	<div class="w-full sm:w-3/5 md:w-1/3">
		<h1 class="text-2xl font-bold mb-2.5">Register</h1>
		<h1 class="text-lg font-normal mb-4">Enter your credentials to register.</h1>
		<RadioGroup display="flex" active="variant-filled-primary" hover="hover:variant-soft-primary">
			<RadioItem bind:group={value} name="justify" value={0}>Student</RadioItem>
			<RadioItem bind:group={value} name="justify" value={1}>Faculty</RadioItem>
		</RadioGroup>

		<form method="POST" class="form">
			<label class="label">
				<span class="text-black">Username</span>
				<input
					class="input variant-form-material text-black"
					type="text"
					bind:value={basicInfo.username}
					name="username"
					placeholder="Enter user name..."
					required
				/>
			</label>

			<span class="text-black">Full Name</span>
			<input
				class="input variant-form-material text-black"
				bind:value={basicInfo.name}
				type="text"
				name="name"
				placeholder="Enter your full name"
			/>
			<span class="text-black">Phone</span>
			<input
				class="input variant-form-material text-black"
				bind:value={basicInfo.phone}
				type="text"
				name="phone"
				placeholder="Enter your phone number"
			/>
			<span class="text-black">Email</span>
			<input
				class="input variant-form-material text-black"
				bind:value={basicInfo.email}
				type="text"
				name="email"
				placeholder="Enter your email"
			/>
			{#if value === 0}
				<span class="text-black">Department</span>
				<!--input type="hidden" name="studentId" bind:value={basicInfo.studentId}-->
				<select bind:value={basicInfo.department} class="select variant-form-material text-black">
					<option value="011">BSCSE</option>
					<option value="021">BSEEE</option>
					<option value="111">BBA</option>
					<option value="121">BSECO</option>
					<option value="012">MSCSE</option>
					<option value="112">MBA</option>
					<option value="125">MDS</option>
					<option value="115">MIHRM</option>
					<option value="124">MSECO</option>
					<option value="031">BSCE</option>
					<option value="211">BSSEDS</option>
				</select>
			{/if}
			<span class="text-black">Date of Birth</span>
			<input
				type="date"
				bind:value={basicInfo.dob}
				class="select variant-form-material text-black"
			/>
			<label class="label">
				<span class="text-black">Password</span>
				<input
					bind:value={basicInfo.password}
					required
					name="password"
					type="password"
					placeholder="Enter password..."
					class="input variant-form-material text-black"
				/>
			</label>

			<button on:click={handleSignup} class="btn btn-sm variant-filled-secondary" type="submit"
				>Register</button
			>
		</form>

		<p>Already have an account? <a href="/login">Login</a></p>
	</div>
</div>

<style>
	.form {
		padding: 1rem;
		border-radius: 0.5rem;
		background-color: #fff;
		box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
	}

	.form button {
		margin-top: 1rem;
	}
	input {
		padding: 0.5rem;
	}
</style>
