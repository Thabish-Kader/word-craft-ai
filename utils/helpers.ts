export const extractWordsAfterSlash = (text: string) => {
	const regex = /\/([^<>\r\n]+)/;
	const match = text.match(regex);
	if (match && match[1]) {
		return match[1].trim();
	}
	return "";
};
