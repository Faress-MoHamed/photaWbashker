function InputField({ name,  value, handleChange, handleBlur, label }) {

	return (
		<div className="flex flex-col gap-[4px] font-Poppins w-full">
			<div className="flex justify-between">
				<label
					className="text-base capitalize font-[400] text-[#666666] "
					htmlFor={name.split(" ").join("")}
				>
					{name}
					{label && (
						<p className="inline-block text-base capitalize font-[400] ml-1 text-[#666666]">
							({label})
						</p>
					)}
				</label>
			</div>
			<div className="relative">
				<input
					type={"text"}
					id={name.split(" ").join("")}
					className="placeholder:text-base placeholder:text-[#111111]/40 border py-[15px] px-[24px] caret-[#FF0000] focus:outline-none border-primary-100 rounded-[12px] h-[56px] w-full"
					placeholder={label ? label : name}
					name={name.split(" ").join("")}
					value={value !== null ? value : ""}
					onChange={handleChange}
					onBlur={handleBlur}
				/>
			</div>
		</div>
	);
}

export default InputField;
