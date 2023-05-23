"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const TextEditor = () => {
	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ font: ["serif", "monospace"] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[{ list: "ordered" }, { list: "bullet" }],
			["link", "image"],
			["clean"],
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
	];

	const handleChange = (content) => {
		console.log(content);
	};

	return (
		<ReactQuill
			theme="snow"
			onChange={handleChange}
			modules={modules}
			formats={formats}
		/>
	);
};
