"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css";
import axios from "axios";
import ReactQuill from "react-quill";
import {
	extractWordsAfterSlash,
	formats,
	modules,
	paraphrase,
	stripHtmlTags,
} from "@/utils/helpers";

type TextEditorv3Props = {
	value: string;
	setValue: (value: string) => void;
	modules: any;
	formats: any;
};

export const TextEditorv3 = ({
	value,
	setValue,
	modules,
	formats,
}: TextEditorv3Props) => {
	const [prompt, setPrompt] = useState("");

	const icons = ReactQuill.Quill.import("ui/icons");
	icons["paraphrasebtn"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;

	const editorRef = React.useRef<ReactQuill>(null);

	const handleKeyDown = async (event: React.KeyboardEvent) => {
		if (event.key === "Tab") {
			event.preventDefault();
			const suggest = stripHtmlTags(value);
			const promptToSend = extractWordsAfterSlash(suggest);

			if (promptToSend !== "") {
				const { data } = await axios.post("/aiassit", {
					suggest: promptToSend,
				});
				const { aiPrompt } = data;
				setPrompt(aiPrompt);
				setValue(value + prompt);
				// TODO: make it so that the cursor is at the end of the prompt
			}
		}
	};

	return (
		<>
			<ReactQuill
				ref={editorRef}
				theme="snow"
				value={value}
				onChange={setValue}
				modules={modules}
				onKeyDown={handleKeyDown}
				formats={formats}
				className=" text-gray-300 "
			/>
		</>
	);
};
