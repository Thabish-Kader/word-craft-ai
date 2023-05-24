"use client";
import React, { useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css";
import dynamic from "next/dynamic";
import axios from "axios";
import Quill, { DeltaStatic, Sources } from "quill";
import { UnprivilegedEditor } from "react-quill";

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

	const giveSuggest = async () => {
		console.log(value);
		const { data } = await axios.post("/aiassit", {
			suggest: value,
		});
		console.log(data);
	};

	const justTexts = (
		content: string,
		delta: DeltaStatic,
		source: Sources,
		editor: UnprivilegedEditor
	) => {
		setValue(editor.getText());
	};

	return (
		<>
			<ReactQuill
				theme="snow"
				value={value}
				onChange={justTexts}
				modules={modules}
				formats={formats}
				className=" text-gray-300"
			/>
			<button
				onClick={giveSuggest}
				className="bg-blue-500 text-white px-4 py-2 rounded-md"
			>
				Click
			</button>
		</>
	);
};
