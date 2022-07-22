import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTE_HOME, ROUTE_LOGIN } from "./routes";
import Home from '../pages/Home/Home';
import Login from "../pages/Login/Login";

function MainRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path={ROUTE_HOME} element={<Home />} />
                <Route path={ROUTE_LOGIN} element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter;
