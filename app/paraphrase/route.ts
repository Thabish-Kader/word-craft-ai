import { NextResponse } from "next/server";
import axios from "axios";

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
		const response = "paraphrased text";
		// const reapidApiResponse = await axios.request(options);
		// const { response } = reapidApiResponse.data;

		return NextResponse.json({ aiPrompt: response });
	} catch (error) {
		console.error(error);
	}
}
