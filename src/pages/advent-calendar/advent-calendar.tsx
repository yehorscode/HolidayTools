import calendarbg from "@/assets/calendarbg.jpg"

const window_rewards: Record<number, string> = {
    1: "Chocolates",
    2: "Candy Cane",
};

export default function AdventCalendar() {
    const windows = Array.from({ length: 24 }, (_, index) => {
        const day = index + 1;
        return {
            day,
            reward: window_rewards[day],
        };
    });
    return (
        <div className="flex justify-center min-w-screen min-h-screen items-center p-5" style={{ backgroundImage: `url(${calendarbg})`}}>
            <div className="grid grid-cols-4 gap-4">
                {windows.map(({ day, reward }) => (
                    <div key={day} className="inline-block">
                        <div className="w-20 h-20 bg-white border-2 border-black flex flex-col justify-center items-center text-2xl font-bold cursor-pointer hover:bg-gray-200">
                            <span>{day}</span>
                            <span className="text-xs font-normal mt-2">
                                {reward ?? "Locked"}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}