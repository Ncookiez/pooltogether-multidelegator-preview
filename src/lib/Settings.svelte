<script lang="ts">

	// Initializations:
	export let maxPrizes = 2;
	export let prizeTiers = [
		{ prize: 1000, num: 1 },
		{ prize: 100, num: 3 },
		{ prize: 50, num: 12 },
		{ prize: 10, num: 48 },
		{ prize: 5, num: 192 },
		{ prize: 5, num: 768 }
	];
	export let dailyPrizeCount = 1024;
	export let dailyPrizeWinnings = 7180;
	const prizeNums = [1, 3, 12, 48, 192, 768, 3072];
	let open = true;

	// Reactive Prize Totals:
	$: getTotalNumPrizes(prizeTiers);
	$: getTotalPrizes(prizeTiers);

	// Function to get total # of prizes:
	const getTotalNumPrizes = (tiers: {prize: number, num: number}[]) => {
		let sum = 0;
		tiers.forEach(tier => {
			sum += tier.num;
		});
		dailyPrizeCount = sum;
	}

	// Function to get total prizes:
	const getTotalPrizes = (tiers: {prize: number, num: number}[]) => {
		let sum = 0;
		tiers.forEach(tier => {
			sum += tier.num * tier.prize;
		});
		dailyPrizeWinnings = sum;
	}
	
</script>

<!-- #################################################################################################### -->

<!-- Settings Modal -->
{#if open}
	<div class="cover" on:click={() => open = false}></div>
	<div class="settingsModal">
		<h3>Want to experiment with different prize settings?</h3>
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
				<span class="addTier" on:click={() => prizeTiers = [...prizeTiers, { prize: 0, num: 1 }]}><strong>+</strong> Add Row</span>
				<span class="removeTier" on:click={() => prizeTiers = [...prizeTiers.slice(0, prizeTiers.length - 1)]}><strong>-</strong> Remove Row</span>
			</span>
		</span>
	</div>
{/if}

<!-- Settings Button -->
<div class="settingsButton" on:click={() => open = !open}>
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