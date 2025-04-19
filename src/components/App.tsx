import React from "react";
import { Hello } from "./Hello";
import TailwindInspector from "./Inspector";

const App = () => {
	return (
		<>
			<div className="tw-inspector">
				<TailwindInspector />
			</div>
		</>
	);
};

export default App;