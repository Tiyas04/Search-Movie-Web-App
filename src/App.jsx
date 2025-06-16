import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from './pages/getstarted';
import Login from './pages/login';
import SignUp from "./pages/signup";
import DashBoard from "./pages/dashboard";
import Profile from "./pages/profile";
import Search from "./pages/search";

const App = () =>{
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element= {<GetStarted />} />
            <Route path="/signup" element = {<SignUp />} />
            <Route path="/login" element = {<Login />} />
            <Route path="/DashBoard" element = {<DashBoard />} />
            <Route path="/profile" element = {<Profile />} />
            <Route path="/search" element = {<Search />} />
        </Routes>
        </BrowserRouter>
    )
}

export default App;