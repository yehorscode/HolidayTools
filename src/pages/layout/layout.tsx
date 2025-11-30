import {Outlet, useNavigate} from "react-router-dom"
export default function Layout() {
    const navigate = useNavigate();
    return (
        <div className="min-w-screen min-h-screen bg-black">
            <nav className="bg-cyan-500 w-screen flex p-1">
                <button className="px-3 bg-gray-100" onClick={() => navigate("/")}>HolidayTools</button>
                <div className="margin-auto ml-auto">
                    <button className="px-3 bg-green-100" onClick={() => navigate("/advent-calendar")}>Advent Calendar</button>
                </div>
            </nav>
            <div className="">
                <Outlet/>
            </div>
        </div>
    )
}