import React, { useState } from "react";
import hljs from "highlight.js";

import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css"; // Add css for snow theme

export const TextEditor2 = () => {
	hljs.configure({
		languages: ["javascript", "ruby", "python", "rust"],
	});

	const theme = "snow";

	const modules = {
		toolbar: [["code-block"]],
		syntax: {
			highlight: (text) => hljs.highlightAuto(text).value,
		},
	};

	const placeholder = "Compose an epic...";

	const formats = ["code-block"];

	const { quill, quillRef } = useQuill({
		theme,
		modules,
		formats,
		placeholder,
	});

	const [content, setContent] = useState("");

	React.useEffect(() => {
		if (quill) {
			quill.on("text-change", () => {
				setContent(quill.root.innerHTML);
			});
		}
	}, [quill]);

	const submitHandler = (e) => {};

	return (
		<div style={{ width: 500, height: 300 }}>
			<div ref={quillRef} />

			<form onSubmit={submitHandler}>
				<button type="submit">Submit</button>
			</form>
			{quill && (
				<div
					className="ql-editor"
					dangerouslySetInnerHTML={{ __html: content }}
				/>
			)}
		</div>
	);
};
