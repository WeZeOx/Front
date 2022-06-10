import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup/Signup";
import NotFound from "./pages/NotFound/NotFound";
import Home from "./pages/Home/Home";
import Signin from "./pages/Signin/Signin";
import { useEditorJWT } from "./utils/jwt.store";
import { useLayoutEffect } from "react";
import { axiosInterceptor } from "./utils/axiosInstance";
import SinglePost from "./pages/SinglePost/SinglePost";
import Navbar from "./components/Navbar/Navbar";

function App(){
  const jwtStore = useEditorJWT()
  
  useLayoutEffect(() => {
    axiosInterceptor(jwtStore.token)
  }, [jwtStore.token])
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/post/:postId' element={<SinglePost/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
