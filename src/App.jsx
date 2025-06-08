import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from './pages/GetStarted';
import Login from './pages/Login';
import SignUp from "./pages/SignUp";
import Home from "./pages/OpenApp";

const App = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element= {<GetStarted />} />
            <Route path="/signup" element = {<SignUp />} />
            <Route path="/login" element = {<Login />} />
            <Route path="/home" element = {<Home />} />
        </Routes>
        </BrowserRouter>
    )
}

export default App;