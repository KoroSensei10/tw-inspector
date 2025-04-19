import React from "react";
import clsx from "clsx";

interface ChipProps {
	label: string;
	active: boolean;
	onToggle: (label: string) => void;
	onRemove?: (label: string) => void;
}

const Chip: React.FC<ChipProps> = ({ label, active, onToggle, onRemove }) => {
	return (
		<div className={clsx(
			"px-2 py-0.5 rounded text-xs font-mono border transition",
			active
				? "bg-gray-800 text-white border-gray-700"
				: "bg-gray-200 text-gray-400 border-gray-300 line-through"
		)}
			title={active ? "Désactiver" : "Réactiver"}>
			<button
				onClick={() => onToggle(label)}

			>
				{label}
			</button>
			<button className="ml-1 text-gray-500 hover:text-gray-700" onClick={() => onRemove?.(label)}>
				(x)
			</button>
		</div>
	);
};

export default Chip;
