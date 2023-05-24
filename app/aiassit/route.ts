import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(request: Request) {
	const { suggest } = await request.json();

	const options = {
		method: "GET",
		url: "https://ai-writer1.p.rapidapi.com/text/",
		params: {
			text: suggest,
		},
		headers: {
			"Content-Type": "application/json",
			"X-RapidAPI-Key": process.env.RAPID_API_KEY,
			"X-RapidAPI-Host": process.env.RAPID_API_HOST,
		},
	};

	try {
		const response =
			"Chaos is the ultimate reality of the universe. It is ever-changing, unpredictable, and uncontrollable. It can bring great destruction and cause great disruption, but it can also bring incredible opportunity and insight. It is a constant in our lives, whether we acknowledge it or not. We must learn to embrace chaos and use it to our advantage. By understanding chaos, we can find order in the chaos, create new patterns and pathways, and find unexpected solutions. We must learn to adapt and use chaos to our advantage, to make sense of the world around us, and to help us reach our goals. By embracing chaos, we can find new ways of looking at things, and discover new possibilities.";
		// const reapidApiResponse = await axios.request(options);
		// const { response } = reapidApiResponse.data;

		return NextResponse.json({ aiPrompt: response });
	} catch (error) {
		console.error(error);
	}
}
