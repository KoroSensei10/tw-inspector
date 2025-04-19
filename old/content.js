let selectedEl = null;
let isSelecting = false;
console.log("Tailwind Inspector loaded");

if (!document.getElementById("tw-inspector")) {
	const overlay = document.createElement("div");
	overlay.id = "tw-inspector";
	overlay.innerHTML = `
    <div id="tw-panel">
      <div class="tw-header">
        <h3>Tailwind Inspector</h3>
        <button id="tw-toggle">🎯 Sélectionner</button>
      </div>
      <div id="tw-info">
        <p id="tw-selected">Aucun élément sélectionné</p>
        <div id="tw-classes"></div>
        <input id="tw-input" type="text" placeholder="Modifier les classes..." />
      </div>
    </div>
  `;
	document.body.appendChild(overlay);

	const input = document.getElementById("tw-input");
	const selected = document.getElementById("tw-selected");
	const classesDiv = document.getElementById("tw-classes");
	const toggleBtn = document.getElementById("tw-toggle");

	toggleBtn.onclick = () => {
		isSelecting = !isSelecting;
		toggleBtn.textContent = isSelecting ? "✅ Stop" : "🎯 Sélectionner";
	};

	overlay.addEventListener("click", (e) => e.stopPropagation());

	document.addEventListener("click", (e) => {
		if (!isSelecting || e.target.closest("#tw-inspector")) return;

		e.preventDefault();
		e.stopPropagation();

		selectedEl = e.target;
		selected.textContent = `<${selectedEl.tagName.toLowerCase()}>`;
		input.value = selectedEl.className;

		updateClassDisplay(selectedEl.className);
	}, true);

	input.addEventListener("input", () => {
		if (selectedEl) {
			selectedEl.className = input.value;
			updateClassDisplay(input.value);
		}
	});

	function updateClassDisplay(classString) {
		const classList = classString.trim().split(/\s+/);
		classesDiv.innerHTML = classList.map(cls => `<span class="tw-chip">${cls}</span>`).join("");
	}
}
