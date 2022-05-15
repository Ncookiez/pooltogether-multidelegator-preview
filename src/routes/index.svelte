<script>

	// Imports:
	import { onMount } from 'svelte';
	import { fetchTVL } from '$lib/tvl';

	// Initializations & Exports:
	const prizeCount = 1024;
	const totalPrizes = 7180;
	let protocolTVL = 0;
	let input = {
		depositAmount: 1000000,
		weeks: 4,
		walletCount: 1000
	}

	onMount(async () => {

		// Fetching V4 TVL:
		protocolTVL = await fetchTVL();
		
	});
	
</script>

<!-- #################################################################################################### -->

<!-- SvelteKit Dynamic Header -->
<svelte:head>
	<title>PoolTogether Multidelegator Preview</title>
	<meta name="description" content="A quick app to showcase some of the PoolTogether Multidelegator's potential." />
</svelte:head>

<!-- Page Content -->
<section>
	<span>TVL: ${protocolTVL.toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
</section>

<!-- #################################################################################################### -->

<style>

	section {
		display: flex;
		justify-content: center;
		align-items: center;
		height: calc(100vh - 50px);
	}
	
</style>