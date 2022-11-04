<script lang="ts">

	// Type Imports:
	import type { Chain } from 'weaverfi/dist/types';

	// Initializations:
	export let chain: Chain;
	export let maxPrizes = 1;
	export let prizeTiers: { prize: number, num: number }[] = [
		{ prize: 200, num: 1 },
		{ prize: 20, num: 2 },
		{ prize: 20, num: 4 },
		{ prize: 1, num: 8 },
		{ prize: 1, num: 32 },
		{ prize: 1, num: 128 },
		{ prize: 1, num: 512 },
		{ prize: 0.5, num: 1024 }
	];
	export let dailyPrizeCount = 3201;
	export let dailyPrizeWinnings = 4200;
	const prizeNums = [1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, 4096];
	let open = false;

	// Default Prize Tiers:
	const ethPrizeTiers: { prize: number, num: number }[] = [
		{ prize: 200, num: 1 },
		{ prize: 164, num: 8 }
	];
	const polyPrizeTiers: { prize: number, num: number }[] = [
		{ prize: 200, num: 1 },
		{ prize: 20, num: 2 },
		{ prize: 20, num: 4 },
		{ prize: 1, num: 8 },
		{ prize: 1, num: 32 },
		{ prize: 1, num: 128 },
		{ prize: 1, num: 512 },
		{ prize: 0.5, num: 1024 }
	];
	const avaxPrizeTiers: { prize: number, num: number }[] = [
		{ prize: 200, num: 1 },
		{ prize: 50, num: 4 },
		{ prize: 5, num: 8 },
		{ prize: 5, num: 16 },
		{ prize: 5, num: 32 },
		{ prize: 5, num: 64 },
		{ prize: 2, num: 256 }
	];
	const opPrizeTiers: { prize: number, num: number }[] = [
		{ prize: 200, num: 1 },
		{ prize: 50, num: 4 },
		{ prize: 5, num: 8 },
		{ prize: 5, num: 16 },
		{ prize: 5, num: 32 },
		{ prize: 5, num: 64 },
		{ prize: 2, num: 256 }
	];
	// Reactive Prize Variables:
	$: prizeTiers = getPrizeTiers(chain);
	$: dailyPrizeCount = prizeTiers.reduce((a, b) => a + b.num, 0);
	$: dailyPrizeWinnings = prizeTiers.reduce((a, b) => a + (b.prize * b.num), 0);

	// Function to get prize tiers:
	const getPrizeTiers = (chain: Chain) => {
		if(chain === 'eth') {
			return ethPrizeTiers;
		} else if(chain === 'poly') {
			return polyPrizeTiers;
		} else if(chain === 'avax') {
			return avaxPrizeTiers;
		} else if(chain === 'op') {
			return opPrizeTiers;
		} else {
			return polyPrizeTiers;
		}
	}
	
</script>

<!-- #################################################################################################### -->

<!-- Settings Modal -->
{#if open}
	<div class="cover" on:click={() => open = false} on:keydown={() => open = false}></div>
	<div class="settingsModal">
		<h3>Want to experiment with different prize settings?</h3>
		<span class="chain">
			<span>Editing</span>
			<select bind:value={chain}>
				<option value="eth">Ethereum</option>
				<option value="poly">Polygon</option>
				<option value="avax">Avalanche</option>
				<option value="op">Optimism</option>
			</select>
			<span>settings.</span>
		</span>
		<span class="maxDailyPrizes">Maximum of <input type="number" bind:value={maxPrizes}> prize{maxPrizes === 1 ? '' : 's'} a day, per wallet!</span>
		<span class="prizeTiers">
			<span class="headers">
				<span><strong># of Prizes</strong></span>
				<span><strong>$ Amount</strong></span>
			</span>
			{#each prizeTiers as tier}
				<span class="prizeTier">
					<select bind:value={tier.num}>
						{#each prizeNums as prizeNum}
							<option>{prizeNum}</option>
						{/each}
					</select>
					<input type="number" bind:value={tier.prize}>
				</span>
			{/each}
			<span class="buttons">
				<span class="addTier" on:click={() => prizeTiers = [...prizeTiers, { prize: 0, num: 1 }]} on:keydown={() => prizeTiers = [...prizeTiers, { prize: 0, num: 1 }]}><strong>+</strong> Add Row</span>
				<span class="removeTier" on:click={() => prizeTiers = [...prizeTiers.slice(0, prizeTiers.length - 1)]} on:keydown={() => prizeTiers = [...prizeTiers.slice(0, prizeTiers.length - 1)]}><strong>-</strong> Remove Row</span>
			</span>
		</span>
	</div>
{/if}

<!-- Settings Button -->
<div class="settingsButton" on:click={() => open = !open} on:keydown={() => open = !open}>
	<img src="/images/settings.svg" alt="Settings">
</div>

<!-- #################################################################################################### -->

<style>

	h3 {
		margin-bottom: .5em;
		text-align: center;
	}

	input, select {
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

	.cover {
		position: fixed;
		height: 100%;
		width: 100%;
		backdrop-filter: blur(4px) brightness(40%);
		isolation: isolate;
	}

	.settingsModal {
		position: fixed;
		display: flex;
		flex-direction: column;
		margin: 10vh 1em;
		padding: 1em 2em;
		background-color: var(--secondary-color);
		border: 4px solid var(--accent-color);
		border-radius: 1em;
		z-index: 1;
	}

	.settingsModal > span {
		margin: .5em 1em;
		font-size: .9em;
	}
	
	.settingsModal .maxDailyPrizes input {
		width: 4ch;
	}

	.settingsModal .prizeTiers {
		display: flex;
		flex-direction: column;
	}

	.settingsModal .prizeTiers select {
		margin: 0 1.3em 0 .4em;
	}

	.settingsModal .prizeTiers option {
		background-color: var(--secondary-color);
	}

	.settingsModal .prizeTiers input {
		width: 8ch;
	}

	.settingsModal .prizeTiers > span {
		display: flex;
		align-items: center;
	}

	.settingsModal .prizeTiers .prizeTier {
		margin: .2em 0;
	}

	.settingsModal .prizeTiers .headers > span {
		width: 6em;
	}

	.settingsModal .prizeTiers .headers > span {
		width: 6em;
	}

	.settingsModal .prizeTiers .buttons > span {
		margin: 1em .2em 0;
		padding: 0 .8em;
		font-size: .9em;
		color: var(--secondary-color);
		background-color: var(--accent-color);
		border-radius: .5em;
		cursor: pointer;
	}

	.settingsButton {
		position: fixed;
		right: 0;
		margin: 2em;
		cursor: pointer;
		z-index: 1;
	}

	.settingsButton > img {
		height: 32px;
		width: 32px;
	}
	
</style>
