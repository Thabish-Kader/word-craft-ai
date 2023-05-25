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
