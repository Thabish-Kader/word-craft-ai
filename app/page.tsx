import Image from "next/image";
import { TextEditor } from "./components/TextEditor";
import { TextEditorv2 } from "./components/TextEditorv2";

import { TextEditorv4 } from "./components/TextEditorv4";

export default function Home() {
	return (
		<main>
			{/* <TextEditor /> */}
			<TextEditorv2 />
			{/* <TextEditorv4 /> */}
		</main>
	);
}
