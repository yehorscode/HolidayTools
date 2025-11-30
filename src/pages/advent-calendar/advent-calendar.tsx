import { useState } from "react";
import calendarbg from "@/assets/calendarbg.jpg";
import "./advent-calendar.scss";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
    24: "something you wish for"
};

export default function AdventCalendar() {
	const [openedDays, setOpenedDays] = useState<Set<number>>(new Set());
	const [activeDay, setActiveDay] = useState<number | null>(null);

	const handleOpen = (day: number) => {
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
			setActiveDay(null);
		}
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
				<AlertDialogContent className="bg-linear-to-br from-blue-300 to-blue-400">
					<AlertDialogHeader>
						<AlertDialogTitle>
							{activeDay ? `Day ${activeDay}` : ""}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{activeDay
								? `Today you get: ${window_rewards[activeDay]}`
								: ""}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel>Close</AlertDialogCancel>
						<AlertDialogAction
							onClick={() => handleDialogChange(false)}
						>
							Got it
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
