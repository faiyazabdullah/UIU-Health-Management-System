<script lang="ts">
	// @ts-nocheck
	import type { PageData } from './$types';
	export let data: PageData;
	console.log(data);
</script>

<!--
<a class="btn btn-sm variant-ghost-surface" href="/faq"> FAQ </a>
<a class="btn btn-sm variant-ghost-surface" href="/contact"> Contact </a>-->
{#if data.user}
	{#if data.faculty}
		<a class="btn btn-sm variant-ghost-surface" href="/prescription"> Write a Prescription </a>
		<a class="btn btn-sm variant-ghost-surface" href="/appointments"> View Appointments </a>
	{:else}
		<a class="btn btn-sm variant-ghost-surface" href="/profile"> Profile </a>
		<a class="btn btn-sm variant-ghost-surface" href="/appointment"> Make an Appointment </a>
	{/if}

	<a class="btn btn-sm variant-ghost-surface" href="/logout"> Log Out </a>
{:else}
	<a class="btn btn-sm variant-ghost-surface" href="/login"> Log In </a>
	<a class="btn btn-sm variant-ghost-surface" href="/register"> Register </a>
{/if}
