<script lang="ts">
	import Links from '$lib/components/Links.svelte';
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';

	import type { PageData } from './$types';
	export let data: PageData;
</script>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<!-- App Bar -->
		<AppBar class="mb-12">
			<svelte:fragment slot="lead">
				<strong class="text-xl uppercase h2 font-bold"><a href="/">UIU Health</a></strong>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<Links {data} />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<!-- Page Route Content -->

	<div class="grid grid-cols-7 gap-4">
		<div class=" col-span-1" />
		<div class="col-span-5"><slot /></div>
		<div class=" col-span-1" />
	</div>
</AppShell>
