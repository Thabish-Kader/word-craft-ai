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
			"Chaos, an enigmatic force that defies our longing for order and predictability. It is the dance of unpredictability, the symphony of disorder that lurks beneath the surface of our seemingly stable world. In chaos, the unexpected reigns supreme, challenging our desire for control and pushing the boundaries of our understanding.";
		// const reapidApiResponse = await axios.request(options);
		// const { response } = reapidApiResponse.data;

		return NextResponse.json({ aiPrompt: response });
	} catch (error) {
		console.error(error);
	}
}
