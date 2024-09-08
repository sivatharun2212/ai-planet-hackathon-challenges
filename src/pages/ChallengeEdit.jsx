import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateChallenge } from "../features/challengesSlice";
import { FaImage } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
const ChallengeEdit = () => {
	const challengesState = useSelector((state) => state.challenges);
	const params = useParams();
	console.log("params", params);

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [challengeName, setChallengeName] = useState("");
	const [challengeId, setChallengId] = useState("");
	const [startDate, setStartData] = useState("");
	const [endDate, setEndDate] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [levelType, setLevelType] = useState("easy");

	const getChallenge = () => {
		const currentChallenge = challengesState.challenges.filter((ch) => ch.challengeId === params.challengeId);
		if (currentChallenge) {
			setChallengeName(currentChallenge[0].challengeName);
			setStartData(currentChallenge[0].startDate);
			setEndDate(currentChallenge[0].endDate);
			setDescription(currentChallenge[0].description);
			setImage(currentChallenge[0].image);
			setLevelType(currentChallenge[0].levelType);
			setChallengId(currentChallenge[0].challengeId);
		}
	};
	useEffect(() => {
		getChallenge();

		// eslint-disable-next-line
	}, [challengesState]);

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		const reader = new FileReader();
		reader.onload = () => {
			const image = reader.result;
			setImage(image);
		};
		reader.readAsDataURL(file);
	};
	const handleSaveChallenge = () => {
		if (!challengeName) {
			alert("Challenge Name is required");
			return;
		}
		if (!startDate) {
			alert("Start Date is required");
			return;
		}
		if (!endDate) {
			alert("End Date is required");
			return;
		}
		if (!description) {
			alert("Description is required");
			return;
		}
		if (!image) {
			alert("Please upload an image");
			return;
		}
		if (!levelType) {
			alert("Please select a level type");
			return;
		}

		const data = {
			challengeId,
			challengeName,
			startDate,
			endDate,
			description,
			image,
			levelType,
		};
		dispatch(updateChallenge(data));
		navigate(-1);
	};

	return (
		<div className="w-screen h-screen bg-[#f8f9fd] overflow-y-auto">
			<Navbar />
			<div>
				<div className="px-20 py-8">
					<h1 className="font-bold text-xl">Challenge Details</h1>
				</div>
				<div className="bg-white px-20 py-8 flex flex-col gap-10 items-start">
					<div className="flex flex-col w-full items-start gap-4">
						<label
							className="text-sm"
							htmlFor="challenge-name">
							Challenge Name
						</label>
						<input
							onChange={(e) => setChallengeName(e.target.value)}
							className="border-[1px] border-[#b7b7b7] w-[30%] rounded outline-none pl-2"
							type="text"
							id="challenge-name"
							value={challengeName}
						/>
					</div>
					<div className="flex flex-col w-full items-start gap-4">
						<label
							className="text-sm"
							htmlFor="start-date">
							Start Data
						</label>
						<input
							onChange={(e) => setStartData(e.target.value)}
							className="border-[1px] border-[#b7b7b7] w-[30%] rounded outline-none"
							type="date"
							id="start-date"
							value={startDate}
						/>
					</div>
					<div className="flex flex-col w-full items-start gap-4">
						<label
							className="text-sm"
							htmlFor="end-date">
							End Data
						</label>
						<input
							onChange={(e) => setEndDate(e.target.value)}
							className="border-[1px] border-[#b7b7b7] w-[30%] rounded outline-none"
							type="date"
							id="end-date"
							value={endDate}
						/>
					</div>
					<div className="flex flex-col w-full items-start gap-4">
						<label
							className="text-sm"
							htmlFor="description">
							Description
						</label>
						<textarea
							className="border-[1px] border-[#b7b7b7] w-[70%] outline-none rounded pl-2"
							id="description"
							onChange={(e) => setDescription(e.target.value)}
							cols="30"
							value={description}
							rows="10"></textarea>
					</div>
					<div className="flex flex-col w-full items-start gap-4 cursor-pointer">
						<label
							className="text-sm"
							htmlFor="image">
							Image
						</label>
						<div>
							<img
								className="w-48 rounded-md"
								src={image}
								alt=""
							/>
						</div>
						<label
							htmlFor="imageUpload"
							className="flex items-center gap-2 cursor-pointer">
							<FaImage color="#44924c" />
							<span className="text-[#44924c]">Change Image</span>
							<FaArrowRightLong color="#44924c" />
						</label>
						<input
							type="file"
							id="imageUpload"
							className="hidden"
							accept="image/svg+xml"
							onChange={handleImageChange}
						/>
					</div>
					<div className="flex flex-col w-full items-start gap-4">
						<label
							className="text-sm"
							htmlFor="level-type">
							Level Type
						</label>
						<select
							onChange={(e) => setLevelType(e.target.value)}
							value={levelType}
							className=" bg-[#f4f4f4] border-[1px] w-52 border-[#d9d9d9]  py-2 rounded outline-none"
							id="level-type">
							<option value="easy">Easy</option>
							<option value="medium">Medium</option>
							<option value="hard">Hard</option>
						</select>
					</div>
					<button
						onClick={handleSaveChallenge}
						className="bg-[#44924c] px-10 py-2 rounded-md text-white mb-10">
						Save Changes
					</button>
				</div>
			</div>
		</div>
	);
};

export default ChallengeEdit;
