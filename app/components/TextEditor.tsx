"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css";
import dynamic from "next/dynamic";
import axios from "axios";

export const TextEditor = () => {
	const [value, setValue] = useState("");
	const [prompt, setPrompt] = useState("");
	const ReactQuill = useMemo(
		() => dynamic(() => import("react-quill"), { ssr: false }),
		[]
	);
	const editorRef = useRef(null);
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

	// const giveSuggest = async () => {
	// 	const suggest = stripHtmlTags(value);
	// 	const { data } = await axios.post("/aiassit", {
	// 		suggest: suggest,
	// 	});
	// 	const { aiPrompt } = data;
	// 	setValue(value + aiPrompt);
	// };

	// function to strip away the html in value state
	const stripHtmlTags = (html: string): string => {
		const tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	};

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === "Tab") {
			event.preventDefault();
			// giveSuggest();
			setValue(value + prompt);
		}
	};

	useEffect(() => {
		const giveSuggest = async () => {
			const suggest = stripHtmlTags(value);
			const { data } = await axios.post("/aiassit", {
				suggest: suggest,
			});
			const { aiPrompt } = data;
			setPrompt(aiPrompt); // Update the prompt state with the received prompt from the backend
		};

		giveSuggest();
	}, [value]);

	return (
		<>
			<ReactQuill
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
