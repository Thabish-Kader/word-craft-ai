import "./globals.css";
import { Inter } from "next/font/google";

export const metadata = {
	title: "Word-Craft",
	description: "AI Powered Text Editor for creators",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className="bg-bg-primary">{children}</body>
		</html>
	);
}
