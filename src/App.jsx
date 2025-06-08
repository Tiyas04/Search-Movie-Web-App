import { BrowserRouter, Routes, Route } from "react-router-dom";
import GetStarted from './pages/getstarted';
import Login from './pages/login';
import SignUp from "./pages/signup";
import Home from "./pages/Home";

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