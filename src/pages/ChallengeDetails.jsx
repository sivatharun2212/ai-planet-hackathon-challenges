import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../components/Navbar";
import moment from "moment";
import { IoMdTime } from "react-icons/io";
import l1 from "../assets/l1.png";
import l2 from "../assets/l2.png";
import l3 from "../assets/l3.png";
import { deleteChallenge } from "../features/challengesSlice";
const ChallengeDetails = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	const [challengeDetails, setChallengeDetails] = useState({});
	const challengesState = useSelector((state) => state.challenges);

	const formatDate = (dateString) => {
		return moment(dateString).format("Do MMM'YY hh:mm A");
	};

	const findStatus = (startDate, endDate) => {
		const now = moment();
		const start = moment(startDate);
		const end = moment(endDate);

		if (now.isAfter(end)) {
			return {
				statusIndication: "Ended on",
				date: formatDate(endDate),
			};
		} else if (now.isBetween(start, end)) {
			return {
				statusIndication: "Ends on",
				date: formatDate(endDate),
			};
		} else if (now.isBefore(start)) {
			return {
				statusIndication: "Starts on",
				date: formatDate(startDate),
			};
		}
	};

	const getChallenge = () => {
		const currentChallenge = challengesState.challenges.filter((ch) => {
			return ch.challengeId === params.challengeId;
		});
		const event = findStatus(currentChallenge[0]?.startDate, currentChallenge[0]?.endDate);

		setChallengeDetails({ ...currentChallenge[0], event });
	};
	useEffect(() => {
		getChallenge();

		// eslint-disable-next-line
	}, [challengesState]);

	const handleDelete = (id) => {
		dispatch(deleteChallenge(id));
		navigate(-1);
	};
	return (
		<div className="w-screen h-screen bg-[#f8f9fd] overflow-y-auto">
			<Navbar />
			<div className="bg-[#003145] p-20 flex flex-col items-start gap-10">
				<div className="flex items-center gap-2 bg-[#ffce5c] py-1 px-2 pr-10 rounded">
					<IoMdTime size={20} />
					<p>{`${challengeDetails.event?.statusIndication} ${challengeDetails.event?.date} (Indian Standard Time)`}</p>
				</div>
				<h1 className="text-4xl text-white">{challengeDetails.challengeName}</h1>
				<p className="text-white">{challengeDetails.description}</p>
				<div className="flex items-center gap-3 bg-white py-1 px-2 rounded-md">
					{challengeDetails.levelType === "easy" ? (
						<img
							className="w-5"
							src={l1}
							alt="easy"
						/>
					) : challengeDetails.levelType === "medium" ? (
						<img
							className="w-5"
							src={l2}
							alt="medium"
						/>
					) : (
						<img
							className="w-5"
							src={l3}
							alt="hard"
						/>
					)}
					<span className="text-[#003145] capitalize">{challengeDetails.levelType}</span>
				</div>
			</div>
			<div className="px-20 shadow-lg">
				<div className="flex justify-between">
					<div className="border-b-[3px] border-[#44924c] px-4 py-3 text-sm font-semibold">Overview</div>
					<div className="flex justify-center items-center gap-10">
						<button
							onClick={() => navigate(`/challenge-edit/${challengeDetails.challengeId}`)}
							className="bg-[#44924c] py-[3px] w-20 rounded-md text-sm text-white">
							Edit
						</button>
						<button
							onClick={() => handleDelete(challengeDetails.challengeId)}
							className="py-[3px] rounded-md text-sm w-20 text-[#dc1414] border-[1px] border-[#dc1414]">
							Delete
						</button>
					</div>
				</div>
			</div>
			<div>
				<div className="w-[70%] p-14 flex flex-col gap-4">
					<p>
						Butterflies are the adult flying stage of certain insects belonging to an order or group called Lepidoptera. The
						word "Lepidoptera" means "scaly wings" in Greek. This name perfectly suits the insects in this group because their
						wings are covered with thousands of tiny scales overlapping in rows.
					</p>
					<p>
						An agency of the Governmental Wildlife Conservation is planning to implement an automated system based on computer
						vision so that it can identify butterflies based on captured images.{" "}
					</p>
					<p>
						As a consultant for this project, you are responsible for developing an efficient model. Your Task is to build an
						Image Classification Model using CNN that classifies to which class of weather each image belongs to.
					</p>
				</div>
			</div>
		</div>
	);
};

export default ChallengeDetails;
