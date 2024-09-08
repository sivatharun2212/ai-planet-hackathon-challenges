import React from "react";
import RocketImage from "../assets/rocket.svg";
import aiIcon from "../assets/ai-icon.svg";
import binaryIcon from "../assets/binary-icon.svg";
import roboIcon from "../assets/robo-icon.svg";
import { useNavigate } from "react-router-dom";
const Banner = () => {
	const navigate = useNavigate();
	return (
		<div className="w-full flex flex-col">
			<div className="bg-[#003145] w-full p-28 flex">
				<div className=" w-[60%] flex gap-16">
					<div className="bg-[#ffce5c] w-4 h-28"></div>
					<div className="flex flex-col justify-between items-start">
						<h1 className="text-5xl font-bold tracking-wide text-white">Accelerate Innovation with Global AI Challenges</h1>
						<p className="text-white w-[75%]">
							AI Challenges at DPhi simulate real-world problems. It is a great place to put your AI/Data Science skills
							to test on diverse datasets allowing you to foster learning through competitions.
						</p>
						<button
							onClick={() => navigate("/create-challenge")}
							className="bg-white px-4 py-2 rounded-md text-[#003145]">
							Create Challenge
						</button>
					</div>
				</div>
				<div className="w-[40%]">
					<img
						src={RocketImage}
						alt="rocket"
					/>
				</div>
			</div>
			<div className="w-full bg-[#002a3b] flex justify-between px-32 py-12">
				<div className="flex items-center gap-4">
					<img
						className="w-12"
						src={aiIcon}
						alt="ai"
					/>
					<div>
						<h4 className="text-white text-lg font-semibold">100K+</h4>
						<span className="text-white">AI model submissions</span>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<img
						className="w-12"
						src={binaryIcon}
						alt="binary"
					/>
					<div>
						<h4 className="text-white text-lg font-semibold">50K+</h4>
						<span className="text-white">Data Scientists</span>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<img
						className="w-12"
						src={roboIcon}
						alt="robot"
					/>
					<div>
						<h4 className="text-white text-lg font-semibold">100+</h4>
						<span className="text-white">AI Challenges hosted</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Banner;
