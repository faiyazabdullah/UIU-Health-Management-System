<script>
</script>

<div class="flex justify-center">
	<div class="w-full sm:w-3/5 md:w-1/3">
		<h1 class="text-2xl font-bold mb-2.5">Login</h1>
		<h1 class="text-lg font-normal mb-4">Enter your credentials to login.</h1>
		<form method="POST" class="form">
			<label class="label">
				<span class="text-black">Username</span>
				<input
					class="input variant-form-material text-black"
					type="text"
					name="username"
					placeholder="Enter user name..."
					required
				/>
			</label>

			<label class="label">
				<span class="text-black">Password</span>
				<input
					required
					name="password"
					type="password"
					placeholder="Enter password..."
					class="input variant-form-material text-black"
				/>
			</label>

			<button class="btn btn-sm variant-filled-secondary" type="submit">Log In</button>
		</form>

		<p>Don't have an account? <a href="/register">Register</a></p>
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
