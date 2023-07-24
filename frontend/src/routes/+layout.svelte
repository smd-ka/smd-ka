<script lang="ts">
	import logo from '$lib/assets/logos/smd-ka_modified.svg';
	import '../app.css';
</script>

<nav class=" bg-white text-white shadow-md flex justify-center">
	<a href="/">
		<img class="h-14 py-2" src={logo} alt="SMD Logo" />
	</a>
</nav>

<slot />

<div class="mt-10 bg-light-blue text-white flex justify-center gap-8 py-1">
	<a href="/imprint"> Impressum </a>
</div>
