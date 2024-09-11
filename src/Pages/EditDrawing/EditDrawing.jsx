import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useEffect } from "react";
import toast from "react-hot-toast";
import DrawingBoard from "../../components/Drawings/DrawingBoard/DrawingBoard";
import { getDrawing } from "../../Hooks/reactAxiosQuery";
import Loading from "../../components/CommonComponents/Loading";

const EditDrawing = () => {
    const navigate = useNavigate();
    const { drawingId } = useParams();

    // Fetch the drawing using the drawingId from the URL
    const { data: drawing, isLoading, isError, error } = useQuery(
        ["drawing", drawingId],
        () => getDrawing(drawingId),
        {
            // Refetches the data every time drawingId changes
            enabled: !!drawingId
        }
    );

    useEffect(() => {
        // Display error and navigate to explore page if fetching fails
        if (isError) {
            toast.error(error?.response?.data?.message || "Failed to fetch drawing.");
            navigate("/exploreDrawings");
        }
    }, [isError, error, navigate]);

    if (isLoading) {
        // Display loading indicator while fetching
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <Loading className="w-12 h-12" />
            </div>
        );
    }

    return (
        drawing ? (
            // Render the DrawingBoard with the fetched drawing
            <DrawingBoard drawing={drawing} />
        ) : (
            <div className="flex justify-center items-center h-screen w-full">
                <p className="text-xl text-red-500">Drawing not found</p>
            </div>
        )
    );
};

export default EditDrawing;
