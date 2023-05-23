import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(request: Request) {
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
		const response = await axios.request(options);
		console.log(response.data);
	} catch (error) {
		console.error(error);
	}

	return NextResponse.json({ message: "success" });
}
