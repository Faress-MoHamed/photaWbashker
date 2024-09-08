import React from "react";

const HeadLines = ({ title, subTitle }) => {
	return (
		<div className="flex flex-col items-center justify-center mt-16 mb-14">
			<p className="text-lg font-medium uppercase">{subTitle}</p>
			<h3 className="text-4xl font-bold">{title}</h3>
		</div>
	);
};

export default HeadLines;
