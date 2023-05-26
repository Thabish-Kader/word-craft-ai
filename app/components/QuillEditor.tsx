"use client";
import React, { useState } from "react";
import { TextEditorv3 } from "./TextEditorv3";

const paraphrase = (value: string) => {
	console.log(value);
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
			paraphrasebtn: () => {
				const editor = document.querySelector(".ql-editor");
				if (editor) {
					const content = editor.innerHTML;
					paraphrase(content);
				}
			},
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
	"paraphrasebtn",
];

export const QuillEditor = () => {
	const [value, setValue] = useState("");

	return (
		<div className="mx-auto max-w-5xl mt-10 ">
			<TextEditorv3
				value={value}
				setValue={setValue}
				modules={modules}
				formats={formats}
			/>
		</div>
	);
};
