export const CustomButton = () => {
	const handleButtonClick = () => {
		console.log("Clicked!");
	};

	return (
		<span className="" onClick={handleButtonClick}>
			Custom Button
		</span>
	);
};
