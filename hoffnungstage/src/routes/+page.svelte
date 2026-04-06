<script lang="ts">
	import hochschultage from '$lib/assets/hochschultage.jpg';
</script>

<div class="hero" style="background-image: url({hochschultage})">
	<section class="screen">
		<a href="/unterstützen" class="absolute top-0 right-0 p-4 font-bold">Unterstützen</a>
		<h1>Hoffnungstage</h1>
		<h2>Die christliche Hoffnung an der Uni neu entdecken.</h2>
		<h3>8 - 11 Juni 2026 // PH & KIT Campus</h3>
	</section>

	<section class="screen">
		<h2>Section One</h2>
		<p>Your content here</p>
	</section>

	<section class="screen">
		<h2>Section Two</h2>
		<p>More content here</p>
	</section>

	<section class="screen">
		<h2>Section Three</h2>
		<p>Final content here</p>
	</section>
</div>

<style>
	.hero {
		background-attachment: fixed;
		background-size: cover;
		background-position: center;
		min-height: 100vh;
	}

	.screen {
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.5);
		color: white;
		text-align: center;
		padding: 2rem;
		scroll-snap-align: start;
		scroll-snap-stop: always;
	}

	:global(html) {
		scroll-behavior: smooth;
		scroll-snap-type: y mandatory;
	}

	p {
		font-size: 1.2rem;
		margin: 1rem 0 0 0;
	}
</style>
