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
		const response =
			"Chaos, a mysterious power that goes against our yearning for structure and foresight. It embodies the unpredictable choreography, the harmonious disarray that resides beneath the façade of our apparently steady reality. Within chaos, the element of surprise takes center stage, defying our need for dominance and expanding the limits of our comprehension.";
		// const reapidApiResponse = await axios.request(options);
		// const { response } = reapidApiResponse.data;

		return NextResponse.json({ aiPrompt: response });
	} catch (error) {
		console.error(error);
	}
}
