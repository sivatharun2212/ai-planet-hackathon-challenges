import { createSlice } from "@reduxjs/toolkit";

const savedChallenges = JSON.parse(localStorage.getItem("@Challenges")) || [];
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
