<script lang="ts">
	import glauben from '$lib/assets/pages/home/glauben.jpg';
	import denken from '$lib/assets/pages/home/denken.jpg';
	import erleben from '$lib/assets/pages/home/erleben.jpg';
	import Motto from '$lib/components/Motto.svelte';
	import Fa from 'svelte-fa/src/fa.svelte';
	import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
</script>

<section>
	<h1 class="text-center">Unser Motto</h1>
	<div class="flex gap-6 px-4 pt-4 max-md:flex-col">
		<Motto imgSrc={denken} title="Denken">
			An Gott zu glauben heißt nicht, den Verstand auszuschalten. Deswegen wollen wir – Studierende
			aller Fachrichtungen und Konfessionen, die der Glaube an Jesus Christus verbindet –
			miteinander nachdenken, uns austauschen und dabei an wertvollen Erkenntnissen zunehmen.
		</Motto>

		<Motto imgSrc={glauben} title="Glauben">
			<div class="flex justify-center">
				<p class="">
					“Was ist nun also der Glaube? Er ist das <b>Vertrauen</b> darauf, dass das, was wir
					hoffen, sich erfüllen wird, und die <b>Überzeugung</b>, dass das, was man nicht sieht,
					existiert.” - Hebräer 11,1
				</p>
			</div>
		</Motto>

		<Motto imgSrc={erleben} title="Erleben">
			Wir können Gottes Wirken in jedem Lebensbereich erleben. Denn Gott verspricht, dass er in
			jeder Lebenslage bei uns ist (Matthäus 28,20) und jeden Menschen liebt (Johannes 3,16). Daran
			wollen wir uns erinnern und uns gegenseitig ermutigen, indem wir Zeugnis davon geben, was wir
			mit Gott erleben.
		</Motto>
	</div>
	<div class="flex justify-center p-8">
		<a
			href="/about/us"
			class="flex items-center gap-2 rounded-sm bg-primary px-4 py-2 text-white no-underline"
		>
			<Fa icon={faChevronRight} />
			Lerne mehr über uns
		</a>
	</div>
</section>
