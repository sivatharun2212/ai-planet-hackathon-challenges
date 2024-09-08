import { configureStore } from "@reduxjs/toolkit";
import challengesSlice from "../features/challengesSlice";
const store = configureStore({
	reducer: {
		challenges: challengesSlice.reducer,
	},
});

export default store;
