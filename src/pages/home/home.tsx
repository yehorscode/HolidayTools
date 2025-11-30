import winter1 from "@/assets/winter1.jpg";
import winter2 from "@/assets/winter2.jpg";
import winter3 from "@/assets/winter3.jpg";
import winter4 from "@/assets/winter4.jpg";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";
const BG_IMAGES = [winter1, winter2, winter3, winter4];

export default function Home() {
	const navigate = useNavigate();
	const COUNTDOWN_START = 4;
	const [currentImage, setCurrentImage] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [countdown, setCountdown] = useState(COUNTDOWN_START);
	useEffect(() => {
		const randomNumber = Math.floor(Math.random() * BG_IMAGES.length);
		setIsLoading(true);
		setCurrentImage(randomNumber);
		setCountdown(COUNTDOWN_START);
	}, []);
	useEffect(() => {
		if (countdown <= 0) {
			navigate("/advent-calendar");
			return;
		}
		const timeoutId = window.setTimeout(() => {
			setCountdown((prev) => prev - 1);
		}, 1000);
		return () => clearTimeout(timeoutId);
	}, [countdown, navigate]);
	const handleNextImage = () => {
		setIsLoading(true);
		setCurrentImage((prevImage) => (prevImage + 1) % BG_IMAGES.length);
	};

	return (
		<div className="relative flex min-h-screen w-screen items-center justify-center overflow-hidden">
			<img
				src={BG_IMAGES[currentImage]}
				alt="Snowy winter landscape"
				className="absolute inset-0 h-full w-full object-cover opacity-60"
				onLoad={() => setIsLoading(false)}
				onError={() => setIsLoading(false)}
			/>
			<div className="relative flex text-white flex-col items-center justify-center">
				<h1 className="text-6xl text-white font-bold">
					Holiday <br />
					Tools
				</h1>
				<div className="grid grid-cols-1 mt-5 gap-5 text-center">
					<div className="flex flex-col">
						<button className="bg-green-300 text-black p-1 px-10 rounded hover:scale-110 transition-all duration-400">
							Advent Calendar
						</button>
						<span>Redirecting to advent calendar in: {countdown}</span>
					</div>
				</div>
			</div>
			{isLoading && <Skeleton className="absolute inset-0 h-full w-full" />}
			<button
				onClick={handleNextImage}
				className="absolute bottom-10 text-white px-10 bg-black/30 rounded"
			>
				Next image
			</button>
		</div>
	);
}
