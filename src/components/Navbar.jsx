import React from "react";
import logo from "../assets/logo.svg";
const Navbar = () => {
	return (
		<div className="w-full h-[8%] bg-white px-20   flex items-center">
			<img
				className="w-14"
				src={logo}
				alt="logo"
			/>
		</div>
	);
};

export default Navbar;
