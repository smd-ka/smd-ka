export function click_outside(node) {
	window.addEventListener('click', handle_click);

	function handle_click(e) {
		if (!node.contains(e.target)) {
			node.dispatchEvent(new CustomEvent('outsideclick'));
		}
	}

	return {
		destroy() {
			window.removeEventListener('click', handle_click);
		}
	};
}
