
<script>
	import logo from '$lib/images/UIULogo.png';
	//if the time is between 9am to 6pm, then say "we close in x hours"
	//else say "we open in x hours"

	function getOpeningStatus() {
		const now = new Date();
		const currentDay = now.getDay(); // Get current day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
		const currentHour = now.getHours();
		const currentMinute = now.getMinutes();

		// Calculate the current time in minutes for easier comparison
		const currentTimeInMinutes = currentHour * 60 + currentMinute;

		// Define opening and closing times in minutes (8:30 AM and 4:30 PM)
		const openingTime = 8 * 60 + 30; // 8:30 AM in minutes
		const closingTime = 16 * 60 + 30; // 4:30 PM in minutes

		// Check if it's Thursday (4) or Friday (5) and return a message accordingly
		if (currentDay === 4 || currentDay === 5) {
			return 'We are closed today';
		}

		// For other days (Saturday = 6, Sunday = 0, Monday = 1, Tuesday = 2, Wednesday = 3)
		let remainingMinutes;
		if (currentTimeInMinutes >= openingTime && currentTimeInMinutes < closingTime) {
			remainingMinutes = closingTime - currentTimeInMinutes;
			const hours = Math.floor(remainingMinutes / 60);
			const minutes = remainingMinutes % 60;
			return `We close in ${hours} hours and ${minutes} minutes`;
		} else {
			remainingMinutes =
				currentTimeInMinutes < openingTime
					? openingTime - currentTimeInMinutes
					: openingTime + 24 * 60 - currentTimeInMinutes;
			const hours = Math.floor(remainingMinutes / 60);
			const minutes = remainingMinutes % 60;
			return `We open in ${hours} hours and ${minutes} minutes`;
		}
	}

	const openingStatus = getOpeningStatus();
</script>

<div class="container h-full mx-auto flex justify-center items-center">
	<div class="space-y-10 text-center flex flex-col items-center">
		<h2 class="h2 font-bold">Welcome to UIU Health.</h2>
		<figure>
			<section class="img-bg" />
			<img src={logo} alt="UIU Logo" class="w-64 h-64 md:w-80 md:h-80" />
		</figure>
		<div class="flex flex-col justify-center space-x-2">
			<div class=" mb-4 mx-auto max-w-2xl lg:mx-0">
				<h2 class="text-4xl font-bold tracking-tight">Here to help</h2>
				<p class="mt-6 text-lg leading-8">{openingStatus}</p>
			</div>

			<a class="btn variant-filled" href="/appointment"> Make an Appointment </a>
			<a class="btn variant-filled" href="/faq"> FAQ </a>
		</div>
	</div>
</div>

<style lang="postcss">
	figure {
		@apply flex relative flex-col;
	}
	.img-bg {
		@apply w-64 h-64 md:w-80 md:h-80;
	}
	.img-bg {
		@apply absolute z-[-1] rounded-full blur-[50px] transition-all;
		animation: pulse 5s cubic-bezier(0, 0, 0, 0.5) infinite, glow 5s linear infinite;
	}
	@keyframes glow {
		0% {
			@apply bg-primary-400/50;
		}
		33% {
			@apply bg-secondary-400/50;
		}
		66% {
			@apply bg-tertiary-400/50;
		}
		100% {
			@apply bg-primary-400/50;
		}
	}
	@keyframes pulse {
		50% {
			transform: scale(1.5);
		}
	}
</style>
