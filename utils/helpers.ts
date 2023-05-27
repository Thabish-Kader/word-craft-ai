import axios from "axios";

export const extractWordsAfterSlash = (text: string) => {
	const regex = /\/([^<>\r\n]+)/;
	const match = text.match(regex);
	if (match && match[1]) {
		return match[1].trim();
	}
	return "";
};

export const stripHtmlTags = (html: string): string => {
	const tmp = document.createElement("DIV");
	tmp.innerHTML = html;
	return tmp.textContent || tmp.innerText || "";
};

export const paraphrase = async (userText: string) => {
	const text = stripHtmlTags(userText);
	if (text !== "") {
		const { data } = await axios.post("/paraphrase", {
			textToParaphrase: text,
		});
		const { aiPrompt } = data;
		return aiPrompt;
	} else {
		alert("Please enter some text");
		return "";
	}
};

export const modules = {
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
			paraphrasebtn: async () => {
				const editor = document.querySelector(".ql-editor");
				const button = document.querySelector(
					".ql-paraphrasebtn"
				) as HTMLButtonElement;
				if (editor) {
					const content = editor.innerHTML;
					button.disabled = true;
					const paraphrasedContent = await paraphrase(content);
					editor.innerHTML = paraphrasedContent;
					button.disabled = false;
				}
			},
		},
	},
};

export const formats = [
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
