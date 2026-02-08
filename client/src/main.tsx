import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

try {
	const theme = localStorage.getItem("theme");
	if (theme === "dark") document.documentElement.classList.add("dark");
	if (theme === "light") document.documentElement.classList.remove("dark");
} catch {
	// ignore
}

createRoot(document.getElementById("root")!).render(<App />);
