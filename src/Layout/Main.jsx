import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";



const Main = () => {
    return (
        <div>
            
            <Toaster
                position="top-right"
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
            />
            <Outlet/>
        </div>
    );
};

export default Main;