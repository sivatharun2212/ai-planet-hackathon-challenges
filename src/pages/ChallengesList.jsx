import React from "react";
import Navbar from "../components/Navbar";

import Banner from "../components/Banner";
import Participation from "../components/Participation";
import Challenges from "../components/Challenges";
const ChallengesList = () => {
	return (
		<div className="w-screen h-screen overflow-y-auto">
			<Navbar />
			<Banner />
			<Participation />
			<Challenges />
		</div>
	);
};

export default ChallengesList;
