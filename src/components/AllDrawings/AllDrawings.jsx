// import { useEffect, useState } from 'react';
// import axios from 'axios';
import { Link } from 'react-router-dom';

const AllDrawings = () => {
    // const [drawings, setDrawings] = useState([]);

    // useEffect(() => {
    //     axios.get('/drawings')
    //         .then((res) => setDrawings(res.data))
    //         .catch((err) => console.error(err));
    // }, []);

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold text-center mb-6">All Drawings</h1>
            <ul className="space-y-4">
                {/* {drawings.map((drawing) => (
                    <li key={drawing._id} className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200">
                        <Link to={`/drawing/${drawing._id}`} className="text-blue-500 font-semibold">
                            {drawing.title}
                        </Link>
                    </li>
                ))} */}
               
                    <li  className="bg-gray-100 p-4 rounded-lg shadow-md hover:bg-gray-200">
                        <Link  className="text-blue-500 font-semibold">
                            Title
                        </Link>
                    </li>
                
            </ul>
        </div>
    );
};

export default AllDrawings;
