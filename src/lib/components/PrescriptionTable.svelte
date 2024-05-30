<script lang="ts">
	import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();
    /**
	 * @type {any[]}
	 */
     export let value= [
		{
        
			drug: 'Paracetamol',
			dosage: '100',
			frequency: 'every sunday',
		},
		{
        
			drug: 'Ritalin',
			dosage: '40',
			frequency: '2 per week',
		}
	];
    let input = {
        drug: '',
        dosage: '',
        frequency: '',
    }
     let tableHead =  ['Drug', 'Dosage (mg)', 'Frequency', 'Action'];

     


	function editDrug(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }, i: number) {
        //first, turn the row into an input field
        //all the fields in the row should be input fields
        //the edit button should be replaced with a save button
        //the save button should save the data to the tableArr
        //the save button should be replaced with an edit button

        //get the row
        let row = event.currentTarget.parentElement.parentElement;
        //get the cells
        let cells = row.children;
        //get the data from the cells
        let drug = cells[0].innerText;
        let dosage = cells[1].innerText;
        let frequency = cells[2].innerText;
        //replace the cells with input fields
        cells[0].innerHTML = `<input type="text" name="drug" id="drug" value="${drug}">`;
        cells[1].innerHTML = `<input type="text" name="dosage" id="dosage" value="${dosage}">`;
        cells[2].innerHTML = `<input type="text" name="frequency" id="frequency" value="${frequency}">`;
        //replace the edit button with a save button
        cells[3].innerHTML = `<button>Save</button>`;
        //add an event listener to the save button  onclick='saveDrug(`+i+`)
        cells[3].children[0].addEventListener('click', function(){
            saveDrug(i);
        });


	}

    function saveDrug(i:number){
        //given a row number accept the values in the input fields of that row into tableArr
        console.log(i);
        let table = document.querySelector('table');
        let row = table.rows[i+1];
        let drug = row.cells[0].children[0].value;
        let dosage = row.cells[1].children[0].value;
        let frequency = row.cells[2].children[0].value;
        value[i] = {drug, dosage, frequency};
        //replace the input fields with the data
        row.cells[0].innerHTML = drug;
        row.cells[1].innerHTML = dosage;
        row.cells[2].innerHTML = frequency;
        //replace the save button with an edit button
        row.cells[3].innerHTML = `<button onclick='editDrug(`+i+`)'>Edit</button>`;

    }


	function addDrug(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement; }) {
		//throw new Error("Function not implemented.");
        //get the values from the input fields
        let drug = input.drug;
        let dosage = input.dosage;
        let frequency = input.frequency;
        //add the values to the tableArr
        value.push({drug, dosage, frequency});
        //update the table
        //get the table
        let table = document.querySelector('table');
        //get the tbody
        let tbody = table.children[1];
        //create a new row
        let row = document.createElement('tr');
        //create the cells
        let drugCell = document.createElement('td');
        let dosageCell = document.createElement('td');
        let frequencyCell = document.createElement('td');
        let actionCell = document.createElement('td');
        //add the values to the cells
        drugCell.innerText = drug;
        dosageCell.innerText = dosage;
        frequencyCell.innerText = frequency;
        actionCell.innerHTML = `<button onclick='editDrug(`+(value.length-1)+`)'>Edit</button>`;
        //add the cells to the row
        row.appendChild(drugCell);
        row.appendChild(dosageCell);
        row.appendChild(frequencyCell);
        row.appendChild(actionCell);
        //add the row to the tbody
        tbody.appendChild(row);
        //clear the input fields
        input.drug = '';
        input.dosage = '';
        input.frequency = '';
	}
    /*
    function saveDrug(id: number, drug: string,  dosage: string,  frequency:string){
        

    }*/

    //read the whole table, and return the data as an array of objects

    function readTable(){
        //only read tbody

        let table = document.querySelector('tbody');
        let tableData = [];
        for(let i = 0; i < table.rows.length; i++){
            let row = table.rows[i];
            //console.log(row.cells[0].innerText);
            let drug = row.cells[0].innerText;
            let dosage = row.cells[1].innerText;
            let frequency = row.cells[2].innerText;
            console.log({drug, dosage, frequency});
            tableData.push({drug, dosage, frequency});
        }
        value = tableData;
        //console.log(tableData);
        //return tableData;
    
    }
</script>


<!-- Responsive Container (recommended) -->
<div class="table-container">
	<!-- Native Table Element -->
	<table class="table table-hover">
		<thead>
			<tr>		
                {#each tableHead as head}
                    <th>{head}</th>
                {/each}
			</tr>
		</thead>
		<tbody>

			{#each value as row, i}
				<tr>
					<td>{row.drug}</td>
                    <td>{row.dosage}</td>
                    <td>{row.frequency}</td>
                    <td><button on:click={(e)=>editDrug(e,i)}>Edit</button></td>
				</tr>
			{/each}
		</tbody>
		<tfoot>
			<tr>
				<td>
                    <input type="text" name="drug" id="drug" placeholder="Drug name" bind:value={input.drug}>
                </td>
                <td>
                    <input type="text" name="dosage" id="dosage" placeholder="Dosage" bind:value={input.dosage}>
                </td>
                <td>
                    <input type="text" name="frequency" id="frequency" placeholder="Frequency" bind:value={input.frequency}>
                </td>
                <td>
                    <button on:click={addDrug}>Add</button>
				</td>
			</tr>
		</tfoot>
	</table>
</div>