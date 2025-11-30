import { useEffect, useRef, useState } from "react";
import calendarbg from "@/assets/calendarbg.jpg";
import "./advent-calendar.scss";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
const window_rewards: Record<number, string> = {
	1: "Half Life 3",
	2: "Candy Cane",
	3: "Absolutely nothing",
	4: "HackClub stickers",
	5: "500 siege coins (call +1 21372137 to receive)",
	6: "Chocolates",
	7: "ROSCHEN candy",
	8: "Alien invasion",
	9: "Chocolates",
	10: "Empty steam account",
	11: "Gazzilion moneys",
	12: "Luck",
	13: "Minecraft 2 (hytale)",
	14: "Idk, whatever u want",
	15: "Free itunes subscription",
	16: "Unforseen  consequences",
	17: "A JOB",
	18: "Minsk traktor",
	19: "A black hole in your house",
	20: "A new car",
	21: "-300 siege coins",
	22: "Mint chocolates",
	23: "A puppy",
	24: "something you wish for",
};

export default function AdventCalendar() {
	const [openedDays, setOpenedDays] = useState<Set<number>>(new Set());
	const [activeDay, setActiveDay] = useState<number | null>(null);
	const [isTrashAnimating, setIsTrashAnimating] = useState(false);
	const [isAccepted, setIsAccepted] = useState(false);
	const trashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const acceptTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	const clearTrashTimeout = () => {
		if (trashTimeoutRef.current) {
			clearTimeout(trashTimeoutRef.current);
			trashTimeoutRef.current = null;
		}
	};

	const clearAcceptTimeout = () => {
		if (acceptTimeoutRef.current) {
			clearTimeout(acceptTimeoutRef.current);
			acceptTimeoutRef.current = null;
		}
	};

	useEffect(() => {
		return () => {
			clearTrashTimeout();
			clearAcceptTimeout();
		};
	}, []);

	const handleOpen = (day: number) => {
		clearTrashTimeout();
		clearAcceptTimeout();
		setIsTrashAnimating(false);
		setIsAccepted(false);
		setOpenedDays((prev) => {
			if (prev.has(day)) {
				return prev;
			}
			const next = new Set(prev);
			next.add(day);
			return next;
		});
		setActiveDay(day);
	};

	const handleDialogChange = (open: boolean) => {
		if (!open) {
			clearTrashTimeout();
			clearAcceptTimeout();
			setActiveDay(null);
			setIsTrashAnimating(false);
			setIsAccepted(false);
		}
	};

	const triggerTrashAnimation = () => {
		clearTrashTimeout();
		clearAcceptTimeout();
		setIsTrashAnimating(false);
		setIsAccepted(false);
		requestAnimationFrame(() => {
			setIsTrashAnimating(true);
		});
		trashTimeoutRef.current = setTimeout(() => {
			handleDialogChange(false);
		}, 1200);
	};

	const triggerAcceptAnimation = () => {
		clearTrashTimeout();
		clearAcceptTimeout();
		setIsTrashAnimating(false);
		setIsAccepted(false);
		requestAnimationFrame(() => {
			setIsAccepted(true);
		});
		acceptTimeoutRef.current = setTimeout(() => {
			handleDialogChange(false);
		}, 1200);
	};
	const windows = Array.from({ length: 24 }, (_, index) => {
		const day = index + 1;
		return {
			day,
			reward: window_rewards[day],
		};
	});

	return (
		<div
			className="flex justify-center min-w-screen min-h-screen items-center p-5"
			style={{ backgroundImage: `url(${calendarbg})` }}
		>
			<div className="grid grid-cols-4 gap-4">
				{windows.map(({ day, reward }) => {
					const isOpened = openedDays.has(day);
					return (
						<div
							key={day}
							className="calendar-window relative w-20 h-20"
						>
							<div
								className={`calendar-window-front absolute inset-0 bg-white border-2 border-black flex flex-col justify-center items-center text-2xl font-bold hover:bg-gray-200 z-10 ${
									isOpened
										? "calendar-window-front--open pointer-events-none"
										: "cursor-pointer"
								}`}
								onClick={() => handleOpen(day)}
							>
								<span>{day}</span>
							</div>
							{reward && (
								<div className="absolute inset-0 bg-white border-2 border-black flex flex-col text-center justify-center items-center text-xs text-green-700">
									<span className="text-center">
										{reward}
									</span>
								</div>
							)}
						</div>
					);
				})}
			</div>
			<AlertDialog
				open={activeDay !== null}
				onOpenChange={handleDialogChange}
			>
				<AlertDialogContent
					className={
						(isTrashAnimating ? "popup--trashed" : "") +
						(isAccepted ? " popup--accepted" : "")
					}
				>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{activeDay ? `Day ${activeDay}` : ""}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{activeDay
								? `Today you get: ${window_rewards[activeDay]}`
								: ""}
							<p className="opacity-50 text-xs">
								No rewards will be given out this is all just a
								joke.
							</p>
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<Button variant="link" onClick={triggerTrashAnimation}>
							<Trash /> I don't want this
						</Button>
						<AlertDialogAction
							onClick={(event) => {
								event.preventDefault();
								triggerAcceptAnimation();
							}}
						>
							Got it
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
