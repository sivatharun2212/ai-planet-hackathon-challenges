import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useSelector } from "react-redux";
import moment from "moment";
import { SiTicktick } from "react-icons/si";
import { MdCancel } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const Challenges = () => {
	const navigate = useNavigate();
	const challengesState = useSelector((state) => state.challenges);

	const [challenges, setChallenges] = useState([]);
	const [challengesToBeDisplayed, setChallengesToBeDisplayed] = useState([]);
	const [isFiltersOpened, setIsFiltersOpened] = useState(false);
	const [appliedFilters, setAppliedFilters] = useState([]);
	const [searchText, setSearchText] = useState("");
	// State for filters
	const [statusFilter, setStatusFilter] = useState({
		all: true,
		active: false,
		upcoming: false,
		past: false,
	});

	const [levelFilter, setLevelFilter] = useState({
		easy: false,
		medium: false,
		hard: false,
	});

	useEffect(() => {
		const findAppliedFilters = () => {
			let applied = [];

			if (statusFilter.active) applied.push("Active");
			if (statusFilter.upcoming) applied.push("Upcoming");
			if (statusFilter.past) applied.push("Past");
			// Check which level filters are active
			if (levelFilter.easy) applied.push("Easy");
			if (levelFilter.medium) applied.push("Medium");
			if (levelFilter.hard) applied.push("Hard");

			setAppliedFilters(applied);
		};
		findAppliedFilters();

		// eslint-disable-next-line
	}, [statusFilter, levelFilter]);

	useEffect(() => {
		setChallenges(challengesState.challenges);
		setChallengesToBeDisplayed(challengesState.challenges);

		// eslint-disable-next-line
	}, [challengesState]);

	useEffect(() => {
		if (searchText) {
			const updatedChallenges = challenges.filter((ch) => {
				return ch.challengeName.toLowerCase().includes(searchText.toLowerCase());
			});
			if (updatedChallenges.length > 0) {
				setChallengesToBeDisplayed(updatedChallenges);
			}
		}

		// eslint-disable-next-line
	}, [searchText]);

	const formatDate = (dateString) => {
		return moment(dateString).format("Do MMM'YY hh:mm A");
	};

	const calculateCountdown = (date) => {
		const now = moment();
		const target = moment(date);
		const duration = moment.duration(target.diff(now));
		const days = duration.days();
		const hours = duration.hours();
		const minutes = duration.minutes();
		return { days, hours, minutes };
	};

	const findStatus = (startDate, endDate) => {
		const now = moment();
		const start = moment(startDate);
		const end = moment(endDate);

		if (now.isAfter(end)) {
			return {
				statusInfo: "Past",
				statusIndication: "Ended on",
				endedDate: formatDate(endDate),
			};
		} else if (now.isBetween(start, end)) {
			return {
				statusInfo: "Active",
				statusIndication: "Ends in",
				countdown: calculateCountdown(endDate),
			};
		} else if (now.isBefore(start)) {
			return {
				statusInfo: "Upcomming",
				statusIndication: "Starts in",
				countdown: calculateCountdown(startDate),
			};
		}
	};

	// Handle filter changes for status
	const handleStatusFilterChange = (e) => {
		const { id, checked } = e.target;

		if (id === "all") {
			// If "All" is selected, deselect other filters
			setStatusFilter({
				all: true,
				active: false,
				upcoming: false,
				past: false,
			});
		} else {
			// If one of the other filters is selected, update its state
			setStatusFilter((prev) => {
				const newState = {
					...prev,
					[id]: checked, // Update the clicked filter
					all: false, // Uncheck "All" when an individual filter is checked
				};

				// If all individual filters are unchecked, check "All"
				if (!newState.active && !newState.upcoming && !newState.past) {
					newState.all = true;
				}

				return newState;
			});
		}
	};

	// Handle filter changes for levels
	const handleLevelFilterChange = (e) => {
		const { id, checked } = e.target;
		setLevelFilter((prev) => ({
			...prev,
			[id]: checked,
		}));
	};

	// Function to apply filters to the challenges array
	useEffect(() => {
		let filteredChallenges = challenges;

		// Filter by status
		if (!statusFilter.all) {
			filteredChallenges = filteredChallenges.filter((challenge) => {
				const status = findStatus(challenge?.startDate, challenge?.endDate).statusInfo;
				return (
					(statusFilter.active && status === "Active") ||
					(statusFilter.upcoming && status === "Upcomming") ||
					(statusFilter.past && status === "Past")
				);
			});
		}

		// Filter by level
		const levelKeys = Object.keys(levelFilter).filter((key) => levelFilter[key]);
		if (levelKeys.length > 0) {
			filteredChallenges = filteredChallenges.filter((challenge) => levelKeys.includes(challenge.levelType.toLowerCase()));
		}

		setChallengesToBeDisplayed(filteredChallenges);

		// eslint-disable-next-line
	}, [statusFilter, levelFilter, challenges]);

	const handleRemoveFilter = (ap) => {
		setStatusFilter({
			...statusFilter,
			[ap.toLowerCase()]: false,
		});

		setLevelFilter({
			...levelFilter,
			[ap.toLowerCase()]: false,
		});
	};
	return (
		<div>
			<div className="bg-[#002a3b] flex flex-col items-center gap-10 p-10">
				<h1 className="text-white text-2xl">Explore Challenges</h1>
				<div className="flex items-center gap-5 w-full justify-center">
					<div className="bg-white flex items-center px-10 gap-2 rounded-md w-[60%] h-10">
						<IoIosSearch size={20} />
						<input
							className="w-full h-full outline-none"
							type="text"
							placeholder="Search"
							onChange={(e) => setSearchText(e.target.value)}
						/>
					</div>
					<div
						onClick={() => {
							setIsFiltersOpened(!isFiltersOpened);
						}}
						className={`flex item bg-white ${
							isFiltersOpened ? "w-[20%] rounded-t-md" : "w-[8%] rounded-md"
						} h-10 cursor-pointer relative`}>
						<div className="w-full flex items-center justify-between px-2 rounded-md">
							<span>Filter</span>
							{isFiltersOpened ? <IoIosArrowUp /> : <IoIosArrowDown />}
						</div>
						{isFiltersOpened && (
							<div
								onClick={(e) => e.stopPropagation()}
								className="bg-white absolute top-10 w-full p-2 flex flex-col gap-4 rounded-b-md cursor-default">
								<div className="border-t-[1px] p-2">
									<span>Status</span>
									<div>
										<div className="flex items-center gap-2">
											<input
												type="checkbox"
												id="all"
												checked={statusFilter.all}
												onChange={handleStatusFilterChange}
											/>
											<label htmlFor="all">All</label>
										</div>
										<div className="flex items-center gap-2">
											<input
												type="checkbox"
												id="active"
												checked={statusFilter.active}
												onChange={handleStatusFilterChange}
											/>
											<label htmlFor="active">Active</label>
										</div>
										<div className="flex items-center gap-2">
											<input
												type="checkbox"
												id="upcoming"
												checked={statusFilter.upcoming}
												onChange={handleStatusFilterChange}
											/>
											<label htmlFor="upcoming">Upcoming</label>
										</div>
										<div className="flex items-center gap-2">
											<input
												type="checkbox"
												id="past"
												checked={statusFilter.past}
												onChange={handleStatusFilterChange}
											/>
											<label htmlFor="past">Past</label>
										</div>
									</div>
								</div>
								<div className="border-t-[1px] p-2">
									<span>Level</span>
									<div>
										<div className="flex items-center gap-2">
											<input
												type="checkbox"
												id="easy"
												checked={levelFilter.easy}
												onChange={handleLevelFilterChange}
											/>
											<label htmlFor="easy">Easy</label>
										</div>
										<div className="flex items-center gap-2">
											<input
												type="checkbox"
												id="medium"
												checked={levelFilter.medium}
												onChange={handleLevelFilterChange}
											/>
											<label htmlFor="medium">Medium</label>
										</div>
										<div className="flex items-center gap-2">
											<input
												type="checkbox"
												id="hard"
												checked={levelFilter.hard}
												onChange={handleLevelFilterChange}
											/>
											<label htmlFor="hard">Hard</label>
										</div>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				{appliedFilters.length > 0 && (
					<div className="flex items-center gap-10">
						{appliedFilters.map((ap) => {
							return (
								<span className="bg-[#f8f9fd7d] px-4 py-1 rounded-full text-white text-sm flex items-center gap-2">
									{ap}
									<div
										onClick={() => handleRemoveFilter(ap)}
										className="cursor-pointer">
										<MdCancel />
									</div>
								</span>
							);
						})}
					</div>
				)}
			</div>
			<div className="bg-[#003145]">
				{challengesToBeDisplayed.length > 0 && (
					<div className="grid grid-cols-3 p-20 gap-8">
						{challengesToBeDisplayed.map((challenge) => {
							const status = findStatus(challenge?.startDate, challenge?.endDate);
							const statusColor =
								status.statusInfo === "Past"
									? "#ff3c002b"
									: status.statusInfo === "Active"
									? "#44924c3d"
									: status.statusInfo === "Upcomming"
									? "#f2c94c40"
									: "";
							console.log(challenge.image);
							return (
								<div
									key={challenge.challengeId}
									className="bg-white rounded-2xl w-[90%]">
									<div className="w-full h-[30%]">
										<img
											className="w-full h-full object-cover"
											src={challenge.image}
											alt=""
										/>
									</div>
									<div className="flex flex-col items-center justify-between px-10 h-[70%] gap-6 py-6 ">
										<div
											style={{ backgroundColor: statusColor }}
											className="w-24 rounded-md flex justify-center items-center">
											{status.statusInfo}
										</div>
										<p className="font-bold text-center text-lg">{challenge.challengeName}</p>
										<div className="flex flex-col gap-4 items-center">
											<span className="font-medium text-[#454545]">{status.statusIndication}</span>
											{status.statusInfo === "Past" ? (
												<span className="font-medium text-[#454545]">{status?.endedDate}</span>
											) : (
												<div className="flex gap-2">
													<div className="flex flex-col items-center">
														<span className="font-semibold text-xl text-[#454545]">
															{String(status.countdown.days).padStart(2, "0")}
														</span>
														<span className="text-[#454545] text-sm">Days</span>
													</div>
													:
													<div className="flex flex-col items-center">
														<span className="font-semibold text-xl text-[#454545]">
															{String(status.countdown.hours).padStart(2, "0")}
														</span>
														<span className="text-[#454545] text-sm">Hours</span>
													</div>
													:
													<div className="flex flex-col items-center">
														<span className="font-semibold text-xl text-[#454545]">
															{String(status.countdown.minutes).padStart(2, "0")}
														</span>
														<span className="text-[#454545] text-sm">Minutes</span>
													</div>
												</div>
											)}
										</div>
										<div
											onClick={() => navigate(`/challenges-list/${challenge.challengeId}`)}
											className="flex items-center gap-3 bg-[#44924c] px-4 py-2 rounded-xl cursor-pointer">
											<SiTicktick color="white" />
											<span className="text-white">Participate Now</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
};

export default Challenges;
