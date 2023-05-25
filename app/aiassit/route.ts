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
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur eligendi explicabo ipsam voluptates in ex facilis magnam, eveniet rem corrupti dolores! Eos nesciunt autem nemo ducimus necessitatibus sequi voluptate esse?";
		// const reapidApiResponse = await axios.request(options);
		// const { response } = reapidApiResponse.data;

		return NextResponse.json({ aiPrompt: response });
	} catch (error) {
		console.error(error);
	}
}
