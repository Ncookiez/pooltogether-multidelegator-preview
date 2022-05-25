<script lang="ts">

	// Imports:
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { fetchTVL } from '$lib/tvl';
	import { fetchAPR } from '$lib/apr';

	// Initializations & Exports:
	const dailyPrizeCount = 1024;
	const dailyPrizeWinnings = 7180;
	let protocolTVL = 0;
	let input = {
		depositAmount: 500000,
		weeks: 4,
		wallets: 1000
	}

	// Calculation Reactive Variables:
	$: potentialTVL = protocolTVL + input.depositAmount;
	$: avgDelegation = input.depositAmount / input.wallets;
	$: dailyOdds = 1 / (1 - (((potentialTVL - avgDelegation) / potentialTVL) ** dailyPrizeCount));
	$: dailyWins = input.wallets / dailyOdds;
	$: totalWins = dailyWins * (input.weeks * 7);
	$: apr = fetchAPR(potentialTVL, avgDelegation);
	$: totalGains = (input.depositAmount * (apr / 100)) * (input.weeks / 52);

	// Style Reactive Variables:
	$: depositWidth = getInputWidth(input.depositAmount);
	$: weeksWidth = getInputWidth(input.weeks);
	$: walletsWidth = getInputWidth(input.wallets);

	// Function to format dollars:
	const formatDollars = (num: number) => {
		if(num >= 1e7) {
			return `$${formatNum(num / 1e6)}M`;
		} else if(num >= 1e6) {
			return `$${formatNum(num / 1e6, 1)}M`;
		} else if(num >= 1e3) {
			return `$${formatNum(num)}`;
		} else {
			return `$${formatNum(num, 2)}`;
		}
	}

	// Function to format any number:
	const formatNum = (num: number, decimals?: number) => {
		if(num) {
			return num.toLocaleString(undefined, {maximumFractionDigits: decimals ??= 0})
		} else {
			return 0;
		}
	}

	// Function to get input width based on input value:
	const getInputWidth = (value?: number) => {
		if(value) {
			let valueLength = value.toString().length;
			if(valueLength > 1) {
				return valueLength + 2;
			}
		}
		return 3;
	}

	onMount(async () => {

		// Setting URL Variables:
		let urlDeposit = $page.url.searchParams.get('deposit');
		if(urlDeposit) { input.depositAmount = parseInt(urlDeposit); }
		let urlWeeks = $page.url.searchParams.get('weeks');
		if(urlWeeks) { input.weeks = parseInt(urlWeeks); }
		let urlWallets = $page.url.searchParams.get('wallets');
		if(urlWallets) { input.wallets = parseInt(urlWallets); }

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

	<!-- Header Content -->
	<div class="header">
		<img src="/images/pooltogether-logo.svg" alt="PoolTogether Logo">
		<h1>
			<span>Multidelegator</span>
			<span>Preview</span>
		</h1>
	</div>

	<!-- Info Content -->
	<div class="info">
		<span>By using PoolTogether's Multidelegator, you can easily delegate to a small or large number of wallets with an amount of your choosing.</span>
		<span>Every wallet you delegate to will have a chance of winning a prize of their own, while you still have complete control over your deposit.</span>
		<div class="stats">
			<img src="/images/poolyflip.gif" alt="PoolyFlip">
			<span class="tvl">
				<span>There is currently</span>
				<span class="value">
					{#if protocolTVL > 0}
						${formatNum(protocolTVL)}
					{:else}
						~loading~
					{/if}
				</span>
				<span>deposited in PoolTogether V4</span>
			</span>
			<span class="dailyPrizes">
				<span>We give out</span>
				<span class="value">{dailyPrizeCount}</span>
				<span>prizes every day</span>
			</span>
			<span class="dailyWinnings">
				<span>This means</span>
				<span class="value">{formatDollars(dailyPrizeWinnings)}</span>
				<span>awarded daily</span>
			</span>
			<img src="/images/poolyflip.gif" alt="PoolyFlip">
		</div>
	</div>

	<!-- Inputs Content -->
	<div class="inputs">
		<h2>How are you planning on diving into the pool?</h2>
		<span class="deposit">
			<span>"I want to delegate</span>
			<input type="number" bind:value="{input.depositAmount}" style="width: {depositWidth}ch" title="This is {formatDollars(input.depositAmount)}, you probably typed it right :3">
			<span>USDC for</span>
			<input type="number" bind:value="{input.weeks}" style="width: {weeksWidth}ch">
			{#if input.weeks === 1}
				<span>week to</span>
			{:else}
				<span>weeks to</span>
			{/if}
			<input type="number" bind:value="{input.wallets}" style="width: {walletsWidth}ch">
			{#if input.wallets === 1}
				<span>wallet."</span>
			{:else}
				<span>different wallets."</span>
			{/if}
		</span>
	</div>

	<!-- Results Content -->
	<div class="results">
		<h2>Here's what you can expect:</h2>
		<span class="resultItems">
			<span class="avgDelegation">
				<span>Each wallet will have</span>
				<span class="value">{formatDollars(avgDelegation)}</span>
				<span>of delegations on average</span>
			</span>
			<span class="dailyOdds">
				<span>This means a wallet has a</span>
				<span class="value">1 in {formatNum(dailyOdds, 2)}</span>
				<span>chance of winning a prize every day</span>
			</span>
			<span class="dailyWins">
				<span>Statistically, this would be</span>
				<span class="value">{formatNum(dailyWins)}</span>
				<span>wins every single day</span>
			</span>
			<span class="totalWins">
				<span>By the end, you'd expect</span>
				<span class="value">{formatNum(totalWins)}</span>
				<span>total prize wins</span>
			</span>
			<span class="apr">
				<span>With a simulated APR of</span>
				<span class="value">{formatNum(apr, 2)}%</span>
				<span>no delegatee could complain</span>
			</span>
			<span class="totalGains">
				<span>This means total winnings of</span>
				<span class="value">{formatDollars(totalGains)}</span>
				<span>distributed amongst the wallets</span>
			</span>
		</span>
	</div>

</section>

<!-- #################################################################################################### -->

<style>

	section {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 15vw;
	}

	h1, h2 {
		font-family: 'Righteous', cursive;
	}

	h1 {
		display: flex;
		flex-direction: column;
		margin: .5em 0 0 1em;
		font-size: 3em;
		letter-spacing: 4px;
	}

	h2 {
		margin: 1em 0;
		font-size: 1.5em;
		text-align: center;
		letter-spacing: 2px;
	}

	input {
		margin: 0 .3em;
		padding: .3em;
		font-family: 'Righteous', cursive;
		color: var(--accent-color);
		background: transparent;
		border: none;
		border-bottom: 2px solid var(--accent-color);
		text-align: center;
		-moz-appearance: textfield;
	}

	input:focus {
		outline: none;
	}
	
	input::-webkit-outer-spin-button, input::-webkit-inner-spin-button {
		margin: 0;
		-webkit-appearance: none;
	}

	.header {
		display: flex;
		align-items: center;
		margin: 3em 0;
	}

	.header > img {
		height: 10em;
	}

	.info, .inputs, .results {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 100%;
	}

	.info > span {
		margin: .3em;
		text-align: center;
	}

	.stats {
		display: flex;
		align-items: center;
	}

	.stats > span, .resultItems > span {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin: 2em 3em;
		white-space: nowrap;
	}

	.value {
		font-family: 'Righteous', cursive;
		font-size: 2.5em;
		color: var(--accent-color);
	}

	.deposit {
		margin-bottom: 2em;
		text-align: center;
	}

	.results {
		margin-bottom: 10vh;
	}

	.resultItems {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0 10vw;
	}

	.resultItems > span {
		width: 30%;
		margin: 1em;
	}

	@media only screen and (max-width: 2000px) {
		.resultItems {
			padding: 0 5vw;
		}
	}

	@media only screen and (max-width: 1600px) {
		.resultItems {
			padding: 0;
		}
		.resultItems > span {
			width: 18em;
			margin: 1em;
		}
	}

	@media only screen and (max-width: 1100px) {
		.stats > img {
			display: none;
		}
	}

	@media only screen and (max-width: 850px) {
		.header {
			flex-direction: column;
		}
		.header > h1 {
			text-align: center;
			margin: .5em;
		}
	}

	@media only screen and (max-width: 800px) {
		.stats {
			flex-direction: column;
		}
		.stats > span {
			margin: 1em 0;
		}
	}

	@media only screen and (max-width: 450px) {
		.header > img {
			width: 100%;
		}
		.header > h1 {
			font-size: 2.2em;
		}
	}
	
</style>