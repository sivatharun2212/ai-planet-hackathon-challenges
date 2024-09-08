import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import CreateChallenge from "./pages/CreateChallenge";
import ChallengesList from "./pages/ChallengesList";
import ChallengeDetails from "./pages/ChallengeDetails";
import ChallengeEdit from "./pages/ChallengeEdit";
const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route
				path="create-challenge"
				element={<CreateChallenge />}
			/>
			<Route
				path="/"
				element={<ChallengesList />}
			/>
			<Route
				path="challenges-list/:challengeId"
				element={<ChallengeDetails />}
			/>
			<Route
				path="challenge-edit/:challengeId"
				element={<ChallengeEdit />}
			/>
		</>
	)
);

function App() {
	return (
		<div className="App">
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
