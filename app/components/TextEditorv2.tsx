"use client";
import React, { useEffect, useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css";
import axios from "axios";
import ReactQuill, { Quill } from "react-quill";
import { extractWordsAfterSlash, stripHtmlTags } from "@/utils/helpers";
import { FaHeart } from "react-icons/fa";
import { CustomButton } from "./CustomButton";

export const TextEditorv2 = () => {
	const [value, setValue] = useState("");
	const [prompt, setPrompt] = useState("");

	const editorRef = React.useRef<ReactQuill>(null);

	const paraphrase = () => {
		console.log("Button clicked");
	};

	const modules = {
		toolbar: {
			container: [
				["bold", "italic", "underline", "strike"],
				["blockquote", "code-block"],
				[{ list: "ordered" }, { list: "bullet" }],
				[{ script: "sub" }, { script: "super" }],
				[{ indent: "-1" }, { indent: "+1" }],
				[{ direction: "rtl" }],
				[{ header: [1, 2, 3, 4, 5, 6, true] }],
				[{ color: [] }, { background: [] }],
				[{ font: [] }],
				[{ align: [] }],
				["link", "image", "video"],
				["paraphrasebtn"],
			],
			handlers: {
				paraphrasebtn: paraphrase,
			},
		},
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
		"paraphrase-btn",
	];

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
