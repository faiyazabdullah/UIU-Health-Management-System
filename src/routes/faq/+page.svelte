<script lang="ts">
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import Hospitals from '$lib/components/Hospitals.svelte';
	import Contacts from '$lib/components/Contacts.svelte';
	export let data: PageData;
	let faq = data.faq;
</script>

<Accordion>
	{#each faq as qa}
		<AccordionItem>
			<svelte:fragment slot="lead">Q</svelte:fragment>
			<svelte:fragment slot="summary"
				><h2 class="text-m font-bold">{qa.question}</h2></svelte:fragment
			>
			<svelte:fragment slot="content">{qa.answer}</svelte:fragment>
		</AccordionItem>
	{/each}
	<AccordionItem>
		<svelte:fragment slot="lead">M</svelte:fragment>
		<svelte:fragment slot="summary">
			<h2 class="text-m font-bold">What hospitals are near me?</h2>
		</svelte:fragment>
		<svelte:fragment slot="content"><Hospitals /></svelte:fragment>
	</AccordionItem>
	<AccordionItem>
		<svelte:fragment slot="lead">C</svelte:fragment>
		<svelte:fragment slot="summary">
			<h2 class="text-m font-bold">Could I contact the faculty?</h2>
		</svelte:fragment>
		<svelte:fragment slot="content"><Contacts /></svelte:fragment>
	</AccordionItem>
	<!-- ... -->
</Accordion>
