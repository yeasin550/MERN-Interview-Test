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
    const { data: drawing, isLoading, isError, error } = useQuery(["drawing", drawingId], () => getDrawing(drawingId));

    useEffect(() => {
        if (isError) {
            toast.error(error?.response?.data?.message);
            navigate("/drawings/explore");
        }
    }, [error, isError, navigate]);

    return (
        isLoading ?
            <div className="flex justify-center items-center h-screen w-full">
                <Loading className="w-12 h-12" />
            </div>
            : <DrawingBoard drawing={drawing?.data} />
    );
};

export default EditDrawing;
