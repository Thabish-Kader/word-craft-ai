import Image from "next/image";
import { TextEditor } from "./components/TextEditor";
import { TextEditorv2 } from "./components/TextEditorv2";
import { QuillEditor } from "./components/QuillEditor";

export default function Home() {
	return (
		<main className="">
			{/* <TextEditor /> */}
			<TextEditorv2 />
			{/* <QuillEditor /> */}
		</main>
	);
}
