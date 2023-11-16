import { useState, useEffect } from "react";

const useFormattedDate = (date:number) => {
	const [formattedDate, setFormattedDate] = useState(null);


	useEffect(
		// @ts-ignore
		() => setFormattedDate(new Date(date).toLocaleDateString("en-US")),
		[]
	);

	return formattedDate;
};

export default useFormattedDate;

