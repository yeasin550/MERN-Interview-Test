/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from 'react';
import { drawArrow, drawCircle, drawDiamond, drawLine, drawPencil, drawRectangle, renderDynamicText } from '../../../Utils/drawingHelpers';
import { Dialog } from '@headlessui/react';
import DrawingToolsNavbar from '../DrawingToolsNavbar/DrawingToolsNavbar';
import DrawingModal from '../DrawingModal/DrawingModal';
import Modal from '../../CommonComponents/Modal';

let newPath = [];

const DrawingBoard = ({ drawing }) => {
    const [elements, setElements] = useState(drawing?.elements || []);
    const isDrawing = useRef(false);
    const [text, setText] = useState('');
    const canvasRef = useRef(null);
    const [color, setColor] = useState('#000000');
    const staticCanvasRef = useRef(null);
    const contextRef = useRef(null);
    const startPoint = useRef(null);
    const staticContextRef = useRef(null);
    const [drawingMode, setDrawingMode] = useState("rectangle");
    const [openModal, setOpen] = useState({ saveDrawing: false, text: false });

    useEffect(() => {
        const canvas = canvasRef?.current;
        const staticCanvas = staticCanvasRef?.current;
        if (!canvas || !staticCanvas) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        staticCanvas.width = window.innerWidth;
        staticCanvas.height = window.innerHeight;
        const context = canvas.getContext('2d');
        const staticContext = staticCanvas.getContext('2d');
        if (context && staticContext) {
            context.scale(2, 2);
            staticContext.scale(1, 1);
            context.lineCap = 'round';
            staticContext.lineCap = 'round';
            context.lineWidth = 1;
            staticContext.lineWidth = 1;
            contextRef.current = context;
            staticContextRef.current = staticContext;
        }
    }, []);

    useEffect(() => {
        const canvas = canvasRef?.current;
        const staticCanvas = staticCanvasRef?.current;
        if (!canvas || !staticCanvas) return;

        const context = canvas.getContext('2d');
        const staticContext = staticCanvas.getContext('2d');
        if (context && staticContext) {
            context.strokeStyle = color;
            staticContext.strokeStyle = color;
        }
    }, [color]);

    useEffect(() => {
        if (elements.length) {
            elements.forEach(element => {
                const { type, properties } = element;
                const { coordinates, color, thickness, content } = properties || {};

                if (contextRef.current) {
                    contextRef.current.strokeStyle = color;
                    contextRef.current.lineWidth = thickness;
                }

                coordinates.forEach(coordPair => {
                    const params = { x: coordPair[1]?.x, y: coordPair[1]?.y, contextRef, startPoint: { current: coordPair[0] }, shouldClear: false };

                    switch (type) {
                        case 'rectangle': drawRectangle(params); break;
                        case 'diamond': drawDiamond(params); break;
                        case 'circle': drawCircle(params); break;
                        case 'line': drawLine(params); break;
                        case 'arrow': drawArrow(params); break;
                        case 'pencil': drawPencil(params); break;
                        case 'text': renderDynamicText({ ...params, text: content, color }); break;
                        default: break;
                    }
                });
            });
        }
    }, [elements]);

    const startDrawing = (e) => {
        const { offsetX, offsetY } = e.nativeEvent;
        if (contextRef.current && drawingMode !== 'text') contextRef?.current?.beginPath();

        startPoint.current = { x: offsetX / 2, y: offsetY / 2 };
        isDrawing.current = true;
    };

    const draw = (e) => {
        if (!isDrawing.current || !contextRef.current) return;
        const { offsetX, offsetY } = e.nativeEvent;
        const params = { x: offsetX / 2, y: offsetY / 2, contextRef, startPoint, text, color };

        switch (drawingMode) {
            case 'rectangle': newPath = drawRectangle(params); break;
            case 'diamond': newPath = drawDiamond(params); break;
            case 'circle': newPath = drawCircle(params); break;
            case 'line': newPath = drawLine(params); break;
            case 'arrow': newPath = drawArrow(params); break;
            case 'pencil': newPath = drawPencil(params); break;
            case 'text': newPath = renderDynamicText(params); break;
            default: break;
        }
    };

    const endDrawing = () => {
        if (contextRef.current && staticContextRef.current && canvasRef.current && staticCanvasRef.current) {
            staticContextRef.current.drawImage(canvasRef.current, 0, 0);
            contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            if (newPath.length) {
                const existingElementIndex = elements.findIndex(element => element.type === drawingMode);
                if (existingElementIndex !== -1) {
                    const newElements = [...elements];
                    newElements[existingElementIndex].properties.coordinates.push(newPath);
                    setElements([...newElements]);
                } else {
                    const newElement = { type: drawingMode, properties: { coordinates: [newPath], color, thickness: contextRef.current?.lineWidth, content: text } };
                    setElements([...elements, newElement]);
                }
            }
        }
        isDrawing.current = false;
        startPoint.current = null;
        newPath = [];
        text && setText("");
    };

    const clearContexts = () => {
        if (contextRef.current && staticContextRef.current) {
            contextRef.current.clearRect(0, 0, (canvasRef)?.current?.width, (canvasRef)?.current?.height);
            staticContextRef.current.clearRect(0, 0, (staticCanvasRef)?.current?.width, (staticCanvasRef)?.current?.height);
        }
    }

    return (
        <div className="flex flex-col items-center relative">
            <div className='mt-4 pl-3 sticky z-50 flex flex-col md:flex-row items-center md:items-start justify-between w-full'>
                <a href="/">
                    
                <button className='sticky z-50 min-w-max mr-4 border-transparent py-2 px-3 rounded text-white bg-primary bg-purple-700 hover:bg-purple-500 focus:bg-purple-700 disabled:bg-purple-300 disabled:text-gray-400'>Home</button>
            </a>
                <div className='flex items-center justify-center w-full'>
                    <DrawingToolsNavbar onModeChange={(mode) => {
                        setDrawingMode(mode);
                        if (mode === "text") setOpen((prev) => ({ ...prev, text: true }));
                    }} onColorChange={(color) => setColor(color)} onReset={() => {
                        clearContexts();
                        setElements([]);
                    }} />
                </div>
                <button disabled={!elements?.length} onClick={() => setOpen((prev) => ({ ...prev, saveDrawing: true }))} className='sticky z-50 min-w-max mr-4 border-transparent py-2 px-3 rounded text-white bg-primary bg-purple-700 hover:bg-purple-500 focus:bg-purple-700 disabled:bg-purple-300 disabled:text-gray-400'>Save Changes</button>
            </div>
            {drawingMode === 'text' && (
                <Modal isOpen={openModal.text} close={() => setOpen((prev) => ({ ...prev, text: false }))}>
                    <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-8 text-gray-900"
                    >
                        Write your text in input box and click on canvas to add text
                    </Dialog.Title>
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Enter text"
                        className="shadow-sm block px-3 py-2 border rounded-md placeholder-gray-400 sm:text-sm focus:outline-none focus:border-indigo-600 w-full mt-4"
                    />
                </Modal>
            )}
            <canvas ref={staticCanvasRef} className="w-full absolute h-screen" />
            <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={endDrawing} onMouseOut={endDrawing} className={`w-full absolute h-screen z-10 ${text ? "cursor-text" : "cursor-crosshair"}`} />
            <DrawingModal isOpen={openModal.saveDrawing} close={() => setOpen((prev) => ({ ...prev, saveDrawing: true }))} elements={elements} title={drawing?.title} description={drawing?.description} />
        </div>
    );
};

export default DrawingBoard;
