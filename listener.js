let listening = false;
let timeoutId = null;

const notifier = document.getElementById("notifier");
const root = document.documentElement;

function clearState() {
	listening = false;
	if (timeoutId) {
		clearTimeout(timeoutId);
		timeoutId = null;
	}
	notifier.classList.add("hidden");
	root.style.setProperty("--number-text-decoration", "none");
	root.style.setProperty("--number-text-color", "var(--discrete)");
}

document.addEventListener("keydown", (event) => {
	if (event.repeat) return;

	const key = event.key;

	if (key === "g") {
		listening = true;
		notifier.classList.remove("hidden");
		root.style.setProperty("--number-text-decoration", "underline");
		root.style.setProperty("--number-text-color", "var(--primary)");

		if (timeoutId) {
			clearTimeout(timeoutId);
		}

		timeoutId = setTimeout(() => {
			clearState();
		}, 1000);

		return;
	}

	if (listening && /^[0-9]$/.test(key)) {
		const link = document.getElementById(key);
		if (link) {
			link.click(); // to respect target=""
		}
	}

	clearState();
});
