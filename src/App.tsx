import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "@/pages/layout/layout"
import Home from "@/pages/home/home"
import AdventCalendar from "@/pages/advent-calendar/advent-calendar"
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/advent-calendar" element={<AdventCalendar />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
export default App;