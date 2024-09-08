import { createSlice } from "@reduxjs/toolkit";
const challengesData = [
	{
		challengeId: "a9507fd0-190c-4720-a3b6-dd0b28f1756d",
		challengeName: "Data Science Bootcamp - Graded Datathon",
		description:
			"Data Science Bootcamp - Graded Datathon is an intensive hackathon where participants apply machine learning techniques to solve real-world problems using large datasets. Teams compete to develop the most accurate and efficient predictive models within a set timeframe.",
		startDate: "2024-09-11",
		endDate: "2024-09-20",
		image: "../assets/data.svg",
		levelType: "easy",
	},
	{
		challengeId: "124e56c5-ec0b-40ff-a560-eab25de1ec11",
		challengeName: "Data Sprint 72 - Butterfly Identification",
		description:
			"Data Sprint 72 - Butterfly Identification is a machine learning challenge where participants build models to accurately classify butterfly species from images. The task focuses on leveraging image processing and classification techniques to identify species from a provided dataset.",
		startDate: "2024-09-21",
		endDate: "2024-09-27",
		image: "../assets/fly.svg",
		levelType: "medium",
	},
	{
		challengeId: "fd16cde4-67ff-4172-8e1b-ddb38a877ea4",
		challengeName: "Data Sprint 71 - Weather Recognition",
		description:
			"Data Sprint 71 - Weather Recognition is a machine learning challenge where participants develop models to recognize different weather conditions based on images. The goal is to use computer vision techniques to accurately classify various weather types from the dataset provided.",
		startDate: "2024-09-04",
		endDate: "2024-09-11",
		image: "../assets/cars",
		levelType: "hard",
	},
	{
		challengeId: "3483f957-d69d-42f1-8eb3-e0b308ff8ee6",
		challengeName: "Data Sprint 70-Airline Passenger Satisfaction",
		description:
			"Data Sprint 70 - Airline Passenger Satisfaction is a machine learning challenge where participants analyze passenger data to predict satisfaction levels. The task involves building models to identify key factors influencing customer satisfaction and providing insights to improve airline services.",
		startDate: "2024-09-06",
		endDate: "2024-09-15",
		image: "../assets/man.svg",
		levelType: "easy",
	},
	{
		challengeId: "9d3d5d71-d088-4ac9-b57d-11b643f80c6f",
		challengeName: "Engineering Graduates Employment Outcomes",
		description:
			"Engineering Graduates Employment Outcomes is a data challenge where participants analyze employment trends and outcomes for engineering graduates.",
		startDate: "2024-09-01",
		endDate: "2024-09-07",
		image: "../assets/prople.svg",
		levelType: "medium",
	},
	{
		challengeId: "301a8fbe-233e-46f9-9e4b-489b12ba201a",
		challengeName: "Travel Insurance Claim Prediction",
		description:
			"Travel Insurance Claim Prediction is a data science challenge where participants build predictive models to determine whether a travel insurance policyholder will file a claim.",
		startDate: "2024-09-01",
		endDate: "2024-09-05",
		image: "../assets/boy.svg",
		levelType: "easy",
	},
];

const savedChallenges = JSON.parse(localStorage.getItem("@Challenges")) || challengesData;
const initialState = {
	challenges: savedChallenges,
};

const challengesSlice = createSlice({
	name: "challenges",
	initialState,
	reducers: {
		setChallenges: (state, action) => {
			state.challenges = [...state.challenges, action.payload];
			localStorage.setItem("@Challenges", JSON.stringify(state.challenges));
		},
		deleteChallenge: (state, action) => {
			const updatedChallenges = state.challenges.filter((challenge) => challenge.challengeId !== action.payload);
			state.challenges = updatedChallenges;
			localStorage.setItem("@Challenges", JSON.stringify(state.challenges));
		},
		updateChallenge: (state, action) => {
			const updatedChallenges = state.challenges.map((challenge) =>
				challenge.challengeId === action.payload.challengeId ? action.payload : challenge
			);
			state.challenges = updatedChallenges;
			localStorage.setItem("@Challenges", JSON.stringify(state.challenges));
		},
	},
});

export const { setChallenges, deleteChallenge, updateChallenge } = challengesSlice.actions;

export default challengesSlice;
