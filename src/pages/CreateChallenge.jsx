import React, { useState } from "react";
import Navbar from "../components/Navbar";
import uploadIcon from "../assets/upload.svg";
import { setChallenges } from "../features/challengesSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
const CreateChallenge = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [challengeName, setChallengeName] = useState("");
	const [startDate, setStartData] = useState("");
	const [endDate, setEndDate] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [levelType, setLevelType] = useState("easy");

	const handleImageChange = (e) => {
		const file = e.target.files[0];

		const reader = new FileReader();
		reader.onload = () => {
			const image = reader.result;
			setImage(image);
		};
		reader.readAsDataURL(file);
	};
	const handleCreateChallenge = () => {
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
			challengeId: uuidv4(),
			challengeName,
			startDate,
			endDate,
			description,
			image,
			levelType,
		};
		dispatch(setChallenges(data));
		navigate("/");
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
						<label
							htmlFor="imageUpload"
							className="flex items-center gap-2 bg-[#f4f4f4] border-[1px] border-[#d9d9d9] px-14 py-2 rounded ">
							<span>Upload</span>
							<img
								src={uploadIcon}
								alt="upload"
							/>
						</label>
						<input
							type="file"
							id="imageUpload"
							className="hidden"
							accept="image/*"
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
						onClick={handleCreateChallenge}
						className="bg-[#44924c] px-10 py-2 rounded-md text-white mb-10">
						Create Challenge
					</button>
				</div>
			</div>
		</div>
	);
};

export default CreateChallenge;
