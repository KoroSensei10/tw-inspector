import React, { useEffect, useState } from "react";
import Chip from "./Chip";
import { useHoverOutline } from "../hooks/useHoverOutile";

type ClassMap = Record<string, boolean>;

const TailwindInspector: React.FC = () => {
	const [isSelecting, setIsSelecting] = useState(false);
	const [selectedEl, setSelectedEl] = useState<HTMLElement | null>(null);
	const [classMap, setClassMap] = useState<ClassMap>({});
	const [tagName, setTagName] = useState("Aucun élément sélectionné");
	const [newClass, setNewClass] = useState("");

	useHoverOutline(isSelecting);

	// Convertit une string de classes → un objet avec booléens
	const parseClasses = (input: string): ClassMap => {
		return input
			.trim()
			.split(/\s+/)
			.filter(Boolean)
			.reduce((acc, cls) => {
				acc[cls] = true;
				return acc;
			}, {} as ClassMap);
	};

	// Transforme le classMap en string pour l’élément
	const applyClasses = (map: ClassMap) => {
		const active = Object.entries(map)
			.filter(([, enabled]) => enabled)
			.map(([cls]) => cls)
			.join(" ");
		if (selectedEl) selectedEl.className = active;
	};

	useEffect(() => {
		const onClick = (e: MouseEvent) => {
			if (!isSelecting) return;

			const path = e.composedPath();
			const isInsidePanel = path.some((el) => {
				return (el as HTMLElement)?.id === "tw-inspector-root";
			});
			if (isInsidePanel) return;

			const target = e.target as HTMLElement;
			e.preventDefault();
			e.stopPropagation();

			setSelectedEl(target);
			setClassMap(parseClasses(target.className));
			setTagName(`<${target.tagName.toLowerCase()}>`);
			setIsSelecting(false);
		};

		document.addEventListener("click", onClick, true);
		return () => document.removeEventListener("click", onClick, true);
	}, [isSelecting]);

	const toggleClass = (cls: string) => {
		setClassMap((prev) => {
			const updated = { ...prev, [cls]: !prev[cls] };
			applyClasses(updated);
			return updated;
		});
	};

	const removeClass = (cls: string) => {
		setClassMap((prev) => {
			const updated = { ...prev };
			delete updated[cls];
			applyClasses(updated);
			return updated;
		});
	};

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newMap = parseClasses(e.target.value);
		setClassMap(newMap);
		applyClasses(newMap);
	};

	const classListString = Object.entries(classMap)
		.map(([cls, active]) => (active ? cls : ""))
		.filter(Boolean)
		.join(" ");

	return (
		<div
			id="tw-inspector-root"
			className="fixed top-4 right-4 z-[999999] w-72 bg-white shadow-sm rounded-lg p-4 text-sm font-sans text-black"
		>
			<div className="flex justify-between items-center mb-2">
				<h3 className="font-bold text-base">Tailwind Inspector</h3>
				<button
					onClick={() => setIsSelecting(!isSelecting)}
					className="bg-sky-500 hover:bg-sky-600 text-white text-xs px-2 py-1 rounded"
				>
					{isSelecting ? "✅ Stop" : "🎯 Sélectionner"}
				</button>
			</div>

			<p className="text-xs font-semibold text-gray-700 mb-2">{tagName}</p>

			<div className="flex flex-wrap gap-1 mb-2 max-h-32 overflow-y-auto pr-1">
				{Object.entries(classMap).map(([cls, active]) => (
					<Chip
						key={cls}
						label={cls}
						active={active}
						onToggle={toggleClass}
						onRemove={removeClass}
					/>
				))}
			</div>

			{/* <textarea
				type="text"
				className="w-full h-fit border border-gray-300 rounded px-2 py-1 font-mono text-xs"
				placeholder="Modifier les classes..."
				onChange={handleInputChange}
				value={classListString}
			>
				{classListString}
			</textarea> */}
			<input
				type="text"
				className="w-full h-fit border border-gray-300 rounded px-2 py-1 font-mono text-xs"
				placeholder="Ajouter une classe..."
				onChange={(e) => setNewClass(e.target.value)}
				value={newClass}
				onKeyDown={(e) => {
					if (e.key === "Enter" && newClass.trim()) {
						setClassMap((prev) => {
							const updated = { ...prev, [newClass]: true };
							applyClasses(updated);
							return updated;
						});
						setNewClass("");
					}
				}}
			/>
		</div>
	);
};

export default TailwindInspector;
