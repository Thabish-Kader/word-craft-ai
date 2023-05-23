"use client";
import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css";
import dynamic from "next/dynamic";

export const TextEditor = () => {
	const [value, setValue] = useState("");
	const ReactQuill = useMemo(
		() => dynamic(() => import("react-quill"), { ssr: false }),
		[]
	);
	const modules = {
		toolbar: [
			["bold", "italic", "underline", "strike"], // toggled buttons
			["blockquote", "code-block"],

			[{ list: "ordered" }, { list: "bullet" }],
			[{ script: "sub" }, { script: "super" }], // superscript/subscript
			[{ indent: "-1" }, { indent: "+1" }], // outdent/indent
			[{ direction: "rtl" }], // text direction

			[{ header: [1, 2, 3, 4, 5, 6, false] }],

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

	return (
		<ReactQuill
			theme="snow"
			value={value}
			onChange={setValue}
			modules={modules}
			formats={formats}
			className=""
		/>
	);
};
