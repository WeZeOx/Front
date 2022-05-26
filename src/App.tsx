import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='*' element={<NotFound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
