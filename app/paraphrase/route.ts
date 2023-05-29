import { NextResponse } from "next/server";
import axios from "axios";
import { resolve } from "path";

// export async function POST(request: Request) {
// 	const { textToParaphrase } = await request.json();

// 	const options = {
// 		method: "GET",
// 		url: "https://ai-writer1.p.rapidapi.com/text/",
// 		params: {
// 			text: `paraphrase this - \n${textToParaphrase}`,
// 		},
// 		headers: {
// 			"Content-Type": "application/json",
// 			"X-RapidAPI-Key": process.env.RAPID_API_KEY,
// 			"X-RapidAPI-Host": process.env.RAPID_API_HOST,
// 		},
// 	};

// 	try {
// 		const reapidApiResponse = await axios.request(options);
// 		const { response } = reapidApiResponse.data;

// 		return NextResponse.json({ aiPrompt: response });
// 	} catch (error) {
// 		console.error(error);
// 	}
// }

// For testing purpose only
export async function POST(request: Request) {
	const { textToParaphrase } = await request.json();

	const options = {
		method: "GET",
		url: "https://ai-writer1.p.rapidapi.com/text/",
		params: {
			text: `paraphrase this - \n${textToParaphrase}`,
		},
		headers: {
			"Content-Type": "application/json",
			"X-RapidAPI-Key": process.env.RAPID_API_KEY,
			"X-RapidAPI-Host": process.env.RAPID_API_HOST,
		},
	};

	try {
		const responsePromise = new Promise((resolve) => {
			setTimeout(async () => {
				const response =
					"This is where the paraphrased text will be displayed. Connect your API KEY to see the ai paraphrase your text";

				resolve(NextResponse.json({ aiPrompt: response }));
			}, 3000);
		});
		return responsePromise;
	} catch (error) {
		console.error(error);
	}
}
