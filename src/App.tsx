import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import { useEditorJWT } from "./utils/jwt.store";
import { useEffect } from "react";
import { axiosInterceptor } from "./utils/axiosInstance";

function App() {
  const jwtStore = useEditorJWT()
  const localJwtToken = localStorage.getItem('jwt-token')
  
  useEffect(() => {
    axiosInterceptor(jwtStore.token)
    jwtStore.setJwtToken(localJwtToken ?? "")
  },[jwtStore.token])
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
