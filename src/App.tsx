import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import { useEditorJWT } from "./utils/jwt.store";
import { useEffect } from "react";

function App() {
  const useEditor = useEditorJWT()
  const localJwtToken = localStorage.getItem('jwt-token')
  
  useEffect(() => {
    useEditor.setJwtToken(localJwtToken ?? "")
  }, [])
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
