"use client";
import React, { useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css";
import dynamic from "next/dynamic";
import axios from "axios";
import ReactQuill from "react-quill";
import { extractWordsAfterSlash } from "@/utils/helpers";

export const TextEditorv2 = () => {
	const [value, setValue] = useState("");
	const [prompt, setPrompt] = useState("");
	const editorRef = React.useRef<ReactQuill>(null);

	// const ReactQuill = useMemo(
	// 	() => dynamic(() => import("react-quill"), { ssr: false }),
	// 	[]
	// );

	const modules = {
		toolbar: [
			["bold", "italic", "underline", "strike"], // toggled buttons
			["blockquote", "code-block"],

			[{ list: "ordered" }, { list: "bullet" }],
			[{ script: "sub" }, { script: "super" }], // superscript/subscript
			[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
			[{ direction: "rtl" }], // text direction

			[{ header: [1, 2, 3, 4, 5, 6, true] }],

			[{ color: [] }, { background: [] }], // dropdown with defaults from theme
			[{ font: [] }],
			[{ align: [] }],

			["link", "image", "video"],
		],
	};

	const formats = [
		"header",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"link",
		"image",
		"font",
		"code-block",
		"direction",
		"color",
		"background",
		"script",
		"indent",
		"align",
	];

	const stripHtmlTags = (html: string): string => {
		const tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	};

	const handleKeyDown = async (event: React.KeyboardEvent) => {
		if (event.key === "Tab") {
			event.preventDefault();
			const suggest = stripHtmlTags(value);
			const promptToSend = extractWordsAfterSlash(suggest);
			console.log(suggest);
			console.log(promptToSend);
			if (promptToSend !== "") {
				const { data } = await axios.post("/aiassit", {
					suggest: promptToSend,
				});
				const { aiPrompt } = data;
				setPrompt(aiPrompt);
				setValue(value + aiPrompt);
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
