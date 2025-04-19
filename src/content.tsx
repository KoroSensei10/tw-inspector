import css from './styles.css?inline';
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";

const div = document.createElement("div");
div.id = "my-extension-root";
document.body.appendChild(div);

const onLoaded = () => {
	const root = document.createElement('div')
	document.body.prepend(root)
	const shadowRoot = root.attachShadow({ mode: 'open' })

	const renderIn = document.createElement('div')
	shadowRoot.appendChild(renderIn)

	createRoot(renderIn).render(
		<React.StrictMode>
			<style type="text/css">{css}</style>
			<App />
		</React.StrictMode>,
	)
}

if (document.readyState === 'complete') {
	onLoaded()
} else {
	window.addEventListener('load', () => {
		onLoaded()
	})
}