<script>
	/*
    
Md. Ariful Islam
Nurse (Male)Mobile : +8801760034145Email : ariful@admin.uiu.ac.bd
Ms. Dipu Rani Sutra Dhar
Nurse (Female)Email : dipurani@admin.uiu.ac.bd 
    */
	let obj = [
		{
			photo: 'https://www.uiu.ac.bd/wp-content/uploads/2021/12/scan0007-245x300.jpg',
			name: 'Shamima Akter',
			designation: 'Senior Medical Officer',
			mobile: '01927257900',
			email: 'shamima@admin.uiu.ac.bd'
		},
		{
			photo: 'https://www.uiu.ac.bd/wp-content/uploads/2023/03/IMG_1679982880218-266x300.jpg',
			name: 'Md. Ariful Islam',
			designation: 'Nurse (Male)',
			mobile: '+8801760034145',
			email: 'ariful@admin.uiu.ac.bd'
		},
		{
			photo:
				'https://www.uiu.ac.bd/wp-content/uploads/2023/05/IMG_20230305_111852_300_x_300_pixel.jpg',
			name: 'Ms. Dipu Rani Sutra Dhar',
			designation: 'Nurse (Female)',
			mobile: '01927257902',
			email: 'dipurani@admin.uiu.ac.bd'
		}
	];
</script>

<div class="w-full text-token grid grid-cols-1 md:grid-cols-3 xl:grid-cols-6 gap-4">
	{#each obj as item}
		<div class="card p-4">
			<header>
				<img src={item.photo} class="bg-black/50 w-full aspect-[3/4]" alt="Post" />
			</header>
			<div class="p-4 space-y-4">
				<h6 class="h6" data-toc-ignore>{item.name}</h6>
				<article>
					<p class="text-sm text-token">{item.designation}</p>
					<p class="text-token">{item.mobile}</p>
					<p class="text-token text-xs">{item.email}</p>
				</article>
			</div>
		</div>
	{/each}
</div>
