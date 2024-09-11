
import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { deleteDrawing, getDrawings } from "../../Hooks/reactAxiosQuery";
import Loading from "../../components/CommonComponents/Loading";
import DrawingPreview from "../../components/Drawings/DrawingPreview/DrawingPreview";
import { queryClient } from "../../Hooks/axiosQuery";

const ExploreDrawings = () => {
    const { data: drawings, isLoading, isError, error } = useQuery("drawings", getDrawings);

    const { mutate: deleteMutate } = useMutation(deleteDrawing, {
        onMutate: async (drawingId) => {
            const previousDrawings = queryClient.getQueryData('drawings');
            queryClient.setQueryData('drawings', (old) => ({ ...old, data: old?.data?.filter((drawing) => drawing._id !== drawingId) }));
            return { previousDrawings };
        },

        onSuccess: () => {
            toast.success(`Drawing deleted successfully`);
        },
        onError: (err, _variables, context) => {
            toast.error(err?.response?.data?.message);
            if (context?.previousDrawings) {
                queryClient.setQueryData('drawings', context.previousDrawings);
            }
        }
    });

    useEffect(() => {
        if (isError) toast.error(error?.response?.data?.message);
    }, [error, isError]);

    const handleDelete = (drawingId) => {
        deleteMutate(drawingId);
    }

    return (
        <div className="container mx-auto mt-4">
            <div className="flex justify-between items-center px-4 md:px-0">
                <h2 className="text-2xl md:text-4xl font-bold font-fira-sans my-10">Explore list of drawings!</h2>
                <a href="/createDrawing">

                    <button className="min-w-fit border-transparent py-2 px-3 rounded text-white bg-primary bg-purple-700 hover:bg-purple-500 focus:bg-purple-700 disabled:bg-red-100 disabled:text-gray-300">Create Drawing</button>
                </a>
            </div>
            {isLoading ? (
                <Loading className="w-12 h-12 mt-10" />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {drawings?.data?.map((drawing) => (
                        <div key={drawing?._id} className="relative border p-4 rounded-lg duration-150 hover:border-red-300 hover:shadow block group">
                            <Link to={`/draw/edit/${drawing?._id}`}>
                                <h3 className="text-lg font-bold font-fira-sans">{drawing?.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{drawing?.description}</p>
                                <DrawingPreview drawing={drawing} />
                            </Link>
                            <div className="absolute top-2 right-2 hidden group-hover:block">
                                <button onClick={() => handleDelete(drawing?._id)} ><MdDeleteOutline className="w-4 h-4 border-transparent py-2 px-3 rounded text-white bg-primary bg-purple-700 hover:bg-purple-500 focus:bg-purple-700 disabled:bg-red-100 disabled:text-gray-300" /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ExploreDrawings;
