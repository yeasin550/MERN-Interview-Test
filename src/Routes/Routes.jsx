

import {
    createBrowserRouter,
} from "react-router-dom";
// import "./index.css";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import EditDrawing from "../Pages/EditDrawing/EditDrawing";
import CreateDrawing from "../Pages/CreateDrawing/CreateDrawing";
import ExploreDrawings from "../Pages/ExploreDrawings/ExploreDrawings";


const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/createDrawing",
                element: <CreateDrawing />
            },
            {
                path: "/drawing_edit/:drawingId",
                element:< EditDrawing />
            },
            {
                path: "/exploreDrawings",
                element:<ExploreDrawings />
            },


        ],
        
    },
    
]);
export default router;



