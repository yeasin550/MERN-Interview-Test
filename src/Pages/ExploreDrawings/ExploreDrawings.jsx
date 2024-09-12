import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { MdDeleteOutline } from "react-icons/md";
import toast from "react-hot-toast";
import { deleteDrawing, getDrawings } from "../../Hooks/reactAxiosQuery";
// import Loading from "../../components/CommonComponents/Loading";
import DrawingPreview from "../../components/Drawings/DrawingPreview/DrawingPreview";
import { queryClient } from "../../Hooks/axiosQuery";

const ExploreDrawings = () => {
    const { data: drawings, isLoading, isError, error } = useQuery("drawings", getDrawings);

    const { mutate: deleteMutate } = useMutation(deleteDrawing, {
        onMutate: async (drawingId) => {
            const previousDrawings = queryClient.getQueryData('drawings');
            queryClient.setQueryData('drawings', (old) => old?.filter((drawing) => drawing._id !== drawingId));
            return { previousDrawings };
        },
        onSuccess: () => {
            toast.success('Drawing deleted successfully');
        },
        onError: (err, _variables, context) => {
            toast.error(err?.response?.data?.message || 'Error deleting drawing');
            if (context?.previousDrawings) {
                queryClient.setQueryData('drawings', context.previousDrawings);
            }
        }
    });

    useEffect(() => {
        if (isError) {
            toast.error(error?.response?.data?.message || 'Error fetching drawings');
        }
    }, [error, isError]);

    const handleDelete = (drawingId) => {
        deleteMutate(drawingId);
    };

    return (
        <div className="container mx-auto mt-4">
            <div className="flex justify-between items-center px-4 md:px-0">
                <div className="my-10">
                    
                <h2 className="text-xl md:text-3xl font-bold font-fira-sans">
                    Explore  collection of drawings & unleash your creativity!
                </h2>
                <p> Dive into unique creations crafted by artists from all over. Discover, get inspired, and enjoy a world of artistic expression!</p>
                </div>
                <Link to="/createDrawing">
                    <button className="min-w-fit border-transparent py-2 px-3 rounded text-white bg-primary bg-purple-700 hover:bg-purple-500 focus:bg-purple-700 disabled:bg-red-100 disabled:text-gray-300">
                        Create Drawing
                    </button>
                </Link>
            </div>
            {isLoading ? (
                // <Loading className="w-12 h-12 mt-10" />
                <div className="flex items-center justify-center">
                    <div className="text-3xl dark:text-white">Loading...</div>;
                    <div className="flex flex-row gap-4">
                        <div className="w-12 h-12 rounded-full animate-spin bg-gray-50 border-y border-solid border-cyan-500 border-t-transparent shadow-md"></div>
                    </div>
                </div>
            ) : drawings?.length ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                    {drawings.map((drawing) => (
                        <div key={drawing._id} className="relative border p-4 rounded-lg duration-150 hover:border-black hover:shadow-md block group">
                            <Link to={`/drawing_edit/${drawing._id}`}>
                                <h3 className="text-lg text-purple-700 font-bold font-fira-sans">{drawing.title}</h3>
                                <p className="text-sm text-gray-600 mb-4">{drawing.description}</p>
                                <DrawingPreview drawing={drawing} />
                            </Link>
                            <div className="absolute top-2 right-2 hidden group-hover:block">
                                <button onClick={() => handleDelete(drawing._id)}>
                                    <MdDeleteOutline className="w-8 h-8 border-transparent p-1 rounded-full text-white bg-primary bg-[#FE0000] hover:bg-red-500 focus:bg-red-700" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-xl text-gray-500 text-center mt-10">
                    No drawings found.
                </p>
            )}
        </div>
    );
};

export default ExploreDrawings;
