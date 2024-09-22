import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

function InputField({
	name,
	type,
	pass,
	value,
	handleChange,
	handleBlur,
	disabled,
	label,
	calender,
	handleCalenderShow,
	max,
}) {
	const [visible, setVisible] = useState(false);

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
				{pass && (
					<button
						onClick={(e) => {
							e.preventDefault();
							setVisible((prev) => !prev);
						}}
						className="flex justify-between text-[#666666]/80 items-center text-[18px] w-[73px]"
					>
						{visible ? (
							<BiShow className="w-[22px] h-[22px]" />
						) : (
							<BiHide className="w-[22px] h-[22px]" />
						)}
						<p>{visible ? "Show" : "Hide"}</p>
					</button>
				)}
			</div>
			<div className="relative">
				<input
					type={!pass ? type : visible ? "text" : "password"}
					min={0}
					max={!!max ? max : undefined}
					id={name.split(" ").join("")}
					className="placeholder:text-base placeholder:text-[#111111]/40 border py-[15px] px-[24px] caret-[#FF0000] focus:outline-none border-[#5E5E5E]/35 rounded-[12px] h-[56px] w-full"
					placeholder={label ? label : name}
					name={name.split(" ").join("")}
					value={value !== null ? value : ""}
					onChange={handleChange}
					onBlur={handleBlur}
					disabled={disabled}
				/>
				{calender && (
					<button
						className="absolute right-4 top-[50%] translate-y-[-50%] bg-black/20 p-2 rounded-full lg:hover:bg-black/40 lg:transition-colors lg:duration-300"
						onClick={(e) => {
							e.preventDefault();
							handleCalenderShow((e) => !e);
						}}
					>
						show Date
					</button>
				)}
			</div>
		</div>
	);
}

export default InputField;
