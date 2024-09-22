import React, { useEffect } from "react";

export default function Modal({
	handleClose,
	children,
	width,
	className,
	parentClassName,
}) {
	// Function to stop body from scrolling

	const stopBodyScrolling = (toggle) => {
		document.body.style.overflow = toggle ? "hidden" : "auto";
	};

	// Use useEffect to handle the mount and unmount lifecycle
	useEffect(() => {
		stopBodyScrolling(true);
		return () => {
			stopBodyScrolling(false);
		};
	}, []);

	// Updated handleClose to manage body scroll
	const closeHandler = () => {
		stopBodyScrolling(false);
		handleClose();
	};

	return (
		<>
			{/* Overlay */}
			<div
				onClick={handleClose && closeHandler}
				className="fixed bg-black/50 inset-0 opacity-1 z-[99] overflow-x-hidden"
			></div>

			{/* Modal Content */}
			<div
				className={`fixed inset-0 flex justify-center items-center z-[100] 
        ${width ? `md:w-[${width}]` : "md:w-[50%]"} ${
					parentClassName
						? parentClassName
						: "md:w-[50%] w-full md:h-full h-2/4"
				} max-h-[90vh] 
        left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2`}
				role="dialog"
				aria-labelledby="modal-title"
				aria-describedby="modal-description"
			>
				<div
					className={`bg-white ${
						className ? className : "p-6"
					} rounded-lg shadow-2xl w-full  h-full overflow-y-auto`}
				>
					{children}
				</div>
			</div>
		</>
	);
}
