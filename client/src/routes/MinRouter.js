import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ROUTE_HOME } from "./routes";
import Home from '../pages/Home/Home';
function MainRouter(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path={ROUTE_HOME} element={<Home />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter;