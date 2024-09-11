/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import axios from 'axios';

const DrawingView = ({ match }) => {
    const [drawing, setDrawing] = useState(null);

    useEffect(() => {
        axios.get(`/drawings/${match.params.id}`)
            .then((res) => setDrawing(res.data))
            .catch((err) => console.error(err));
    }, [match.params.id]);

    return (
        <div className="container mx-auto p-4">
            {drawing && (
                <div>
                    {/* <h2 className="text-2xl font-bold mb-4">{drawing.title}</h2> */}
                    <h2 className="text-2xl font-bold mb-4">My Drawing</h2>
                    <div className="border p-4 rounded-lg bg-white shadow-md">
                        {drawing.elements.map((element, index) => (
                            <div key={index} className="mb-2">
                                {element.type === 'text' ? (
                                    <p className="text-lg">{element.text}</p>
                                ) : (
                                    <p className="text-sm text-gray-700">{element.type} - {JSON.stringify(element.coordinates)}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default DrawingView;
