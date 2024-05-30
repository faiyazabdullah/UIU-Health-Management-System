<script lang="ts">
	import { Calendar } from '@fullcalendar/core';
	//import { co, type O } from '@fullcalendar/core/internal-common';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import listPlugin from '@fullcalendar/list';
	import interactionPlugin from '@fullcalendar/interaction';
	import { list } from 'postcss';
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	// @ts-ignore
	let calendarEl;

	export let classevents: Object[] = [];
	export let faculty: boolean = false;

	function rescheduleAppointment(id: string) {
		//fetch('http://localhost:3000/api/appointments/' + id, {
		//method: 'PUT'
		//});
	}

	onMount(() => {
		// @ts-ignore
		const calendar = new Calendar(calendarEl, {
			initialView: 'listYear',
			headerToolbar: {
				left: 'prev,next today',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay,listYear'
			},
			businessHours: {
				// Days of the week affected (e.g., Monday to Friday)
				daysOfWeek: [0, 1, 2, 3, 6], // Monday = 1, Tuesday = 2, ..., Friday = 5

				// Start and end times for each day
				startTime: '08:30', // 8:30 AM
				endTime: '16:30' // 4:30 PM
			},

			slotMinTime: '08:30', // 8:30 AM
			slotMaxTime: '16:30', // 4:30 PM
			plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
			editable: true,
			events: classevents,
			eventDurationEditable: false,
			eventOverlap: false,
			eventDragStart: function (info) {
				//remove the tooltip
				if (document.getElementsByClassName('tooltip').length != 0)
					document.getElementsByClassName('tooltip')[0].remove();
				//dispatch('dragStart', {id: info.event.id, start: info.event.start});
			},
			eventDrop: function (info) {
				//remove the tooltip
				if (document.getElementsByClassName('tooltip').length != 0)
					document.getElementsByClassName('tooltip')[0].remove();
				dispatch('dragEnd', { id: info.event.id, start: info.event.start });
			},
			eventClick: function (info) {
				//create a tooltip which contains "cancel" and "reschedule" buttons
				var tooltip = document.createElement('div');
				tooltip.classList.add('tooltip');
				tooltip.classList.add('tooltiptext');

				//tooltip.innerHTML =
				//	'<button class="btn btn-sm variant-filled-secondary" type="button" onclick="cancelAppointment('+info.event.id+')>Cancel</button><button class="btn btn-sm variant-filled-secondary" type="button" onclick="rescheduleAppointment('+info.event.id+')>Reschedule</button>';
				tooltip.innerHTML =
					'<button class="btn btn-sm variant-filled-secondary" type="button">Cancel</button>';
				if (faculty) {
					tooltip.innerHTML +=
						'<button class="btn btn-sm variant-filled-secondary" type="button">Billing</button>';
					//add event listener to the "billing" button
					tooltip.children[1].addEventListener('click', function () {
						//remove the tooltip
						tooltip.remove();
						//remove the event from the calendar
						calendar.getEventById(info.event.id).remove();
						let id = info.event.id;
						const action = 'billing';
						dispatch('buttonClick', { action, id });
					});

					//add another button "mark as done"
					tooltip.innerHTML +=
						'<button class="btn btn-sm variant-filled-secondary" type="button">Mark as Done</button>';
					//add event listener to the "mark as done" button
					tooltip.children[2].addEventListener('click', function () {
						//remove the tooltip
						tooltip.remove();
						//remove the event from the calendar
						calendar.getEventById(info.event.id).remove();
						let id = info.event.id;
						const action = 'done';
						dispatch('buttonClick', { action, id });
					});
					
				}

				//add tooltip to the DOM only if it doesn't exist
				//if a different event is clicked, the tooltip will be updated
				if (document.getElementsByClassName('tooltip').length == 0) {
					info.el.appendChild(tooltip);
				} else {
					document.getElementsByClassName('tooltip')[0].remove();
					info.el.appendChild(tooltip);
				}

				//add event listener to the "cancel" button
				tooltip.children[0].addEventListener('click', function () {
					//remove the tooltip
					tooltip.remove();
					//remove the event from the calendar
					calendar.getEventById(info.event.id).remove();
					let id = info.event.id;
					const action = 'cancel';
					dispatch('buttonClick', { action, id });
				});

				//after 5 seconds, remove the tooltip
				setTimeout(function () {
					tooltip.remove();
				}, 5000);
			}
		});
		calendar.render();
	});
</script>

<div class="container">
	<div bind:this={calendarEl} class="fc-day-header fc-widget-header fc-daygrid-day-number" />
</div>

<style>
	.container {
		display: grid;

		padding: 2em;
		gap: 1em;
		margin: 0 auto;

		height: 500px;
		width: 900px;
		box-sizing: border-box;
	}

	.fc-day-header.fc-widget-header {
		/* color: #500D7A;  Change to your desired text color */
	}

	.fc-daygrid-day-number {
		/* color: #500D7A;  Change to your desired text color */
	}

	/* Tooltip container */
	.tooltip {
		position: relative;
		display: inline-block;
		border-bottom: 1px dotted black; /* If you want dots under the hoverable text */
	}

	/* Tooltip text */
	.tooltip .tooltiptext {
		visibility: hidden;
		width: 120px;
		background-color: black;
		color: #fff;
		text-align: center;
		padding: 5px 0;
		border-radius: 6px;

		/* Position the tooltip text - see examples below! */
		position: absolute;
		z-index: 1;
	}

	/* Show the tooltip text when you mouse over the tooltip container */
	.tooltip:hover .tooltiptext {
		visibility: visible;
	}
</style>
