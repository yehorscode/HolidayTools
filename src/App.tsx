import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "./pages/layout/layout"
import Home from "./pages/home/home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
