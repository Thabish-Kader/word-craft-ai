"use client";
import React, { useMemo, useState } from "react";
import "react-quill/dist/quill.snow.css";
import "./custom-quill.css";
import axios from "axios";

import { formats, modules, stripHtmlTags } from "@/utils/helpers";
import { Loading } from "./Loading";

import ReactQuill from "react-quill";
import dynamic from "next/dynamic";

const icons = ReactQuill.Quill.import("ui/icons");
icons["paraphrasebtn"] = `<svg viewbox="0 0 18 18">
    <polygon class="ql-fill ql-stroke" points="6 10 4 12 2 10 6 10"></polygon>
    <path class="ql-stroke" d="M8.09,13.91A4.6,4.6,0,0,0,9,14,5,5,0,1,0,4,9"></path>
  </svg>`;

export const TextEditorv4 = () => {
	const [value, setValue] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const OptimizedReactQuill = useMemo(
		() => dynamic(() => import("react-quill"), { ssr: false }),
		[]
	);

	const handleKeyDown = async (event: React.KeyboardEvent) => {
		if (event.key === "Tab") {
			event.preventDefault();

			const suggest = stripHtmlTags(value);

			if (suggest !== "" && isLoading === false) {
				setIsLoading(true);
				const { data } = await axios.post("/aiassit", {
					suggest: suggest,
				});
				const { aiPrompt } = data;

				const updatedValue = suggest.replace(
					/\/\w+/,
					`<p>${aiPrompt}</p>`
				);
				setValue(updatedValue);

				setIsLoading(false);
				console.log(updatedValue);
			}
		}
	};

	// useEffect(() => {
	// 	setValue(promptArray.join("<p>"));
	// }, [promptArray]);

	return (
		<div className="relative mx-auto max-w-5xl mt-10 ">
			<OptimizedReactQuill
				theme="snow"
				value={value}
				onChange={setValue}
				modules={modules}
				onKeyDown={handleKeyDown}
				formats={formats}
				className="text-gray-300"
			/>
			{isLoading && (
				<div className="absolute top-[50%]  flex w-full flex-col items-center justify-center">
					<Loading />
				</div>
			)}
		</div>
	);
};