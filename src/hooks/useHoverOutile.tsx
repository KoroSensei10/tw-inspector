import { useEffect } from "react";

export const useHoverOutline = (enabled: boolean) => {
	useEffect(() => {
		if (!enabled) return;

		let lastHovered: HTMLElement | null = null;

		const handleMouseOver = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (!target.closest("#tw-inspector-root")) {
				lastHovered = target;
				target.style.outline = "2px dashed #ef4444";
				target.style.outlineOffset = "2px";
			}
		};

		const handleMouseOut = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (target === lastHovered) {
				target.style.outline = "";
				target.style.outlineOffset = "";
				lastHovered = null;
			}
		};

		document.addEventListener("mouseover", handleMouseOver);
		document.addEventListener("mouseout", handleMouseOut);

		return () => {
			document.removeEventListener("mouseover", handleMouseOver);
			document.removeEventListener("mouseout", handleMouseOut);
		};
	}, [enabled]);
};
