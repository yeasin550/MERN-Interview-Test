

import {
    createBrowserRouter,
} from "react-router-dom";
// import "./index.css";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import EditDrawing from "../Pages/EditDrawing/EditDrawing";
import CreateDrawing from "../Pages/CreateDrawing/CreateDrawing";
import ExploreDrawings from "../Pages/ExploreDrawings/ExploreDrawings";
// import { Toaster } from "react-hot-toast";

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
                path: "/draw/edit/:drawingId",
                element:< EditDrawing />
            },
            {
                path: "/exploreDrawings",
                element:<ExploreDrawings />
            },


        ]
    },
]);
export default router;



{/* <Toaster
    position="bottom-left"
    toastOptions={{
        duration: 10000,
        success: {
            style: {
                background: "#ECFDF3",
            },
        },
        error: {
            style: {
                background: "#FEF3F2",
            },
        },
    }}
/> */}