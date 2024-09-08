import React from "react";
import cardIcon1 from "../assets/carbon_notebook-reference.svg";
import cardIcon2 from "../assets/Vector.svg";
import cardIcon3 from "../assets/Robot.svg";
import cardIcon4 from "../assets/IdentificationCard.svg";
const Participation = () => {
	return (
		<div className="py-20 px-28 flex flex-col gap-10">
			<h1 className="text-center text-2xl font-bold">
				Why Participate in <span className="text-[#44924c]">AI Challenges?</span>
			</h1>
			<div className="grid grid-cols-2 gap-10">
				<div className="bg-[#f8f9fd] flex flex-col gap-3 px-6 py-10 rounded-md">
					<img
						className="w-12"
						src={cardIcon1}
						alt="cardIcon1"
					/>
					<h1>Prove your skills</h1>
					<p>
						Gain substantial experience by solving real-world problems and pit against others to come up with innovative
						solutions.
					</p>
				</div>
				<div className="bg-[#f8f9fd] flex flex-col gap-3 px-6 py-10 rounded-md">
					<img
						className="w-12"
						src={cardIcon2}
						alt="cardIcon2"
					/>
					<h1>Learn from community</h1>
					<p>
						One can look and analyze the solutions submitted by the other Data Scientists in the community and learn from
						them.
					</p>
				</div>
				<div className="bg-[#f8f9fd] flex flex-col gap-3 px-6 py-10 rounded-md">
					<img
						className="w-12"
						src={cardIcon3}
						alt="cardIcon3"
					/>
					<h1>Challenge yourself</h1>
					<p>
						There is nothing for you to lose by participating in a challenge. You can fail safe, learn out of the entire
						experience and bounce back harder.
					</p>
				</div>
				<div className="bg-[#f8f9fd] flex flex-col gap-3 px-6 py-10 rounded-md">
					<img
						className="w-12"
						src={cardIcon4}
						alt="cardIcon4"
					/>
					<h1>Earn recognition</h1>
					<p>
						You will stand out from the crowd if you do well in AI challenges, it not only helps you shine in the community
						but also earns rewards.
					</p>
				</div>
			</div>
		</div>
	);
};

export default Participation;
