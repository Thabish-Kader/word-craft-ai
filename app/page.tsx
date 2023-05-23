import Image from "next/image";
import { TextEditor } from "./components/TextEditor";

export default function Home() {
	return (
		<main className="mx-auto max-w-5xl mt-10 ">
			<TextEditor />
		</main>
	);
}
