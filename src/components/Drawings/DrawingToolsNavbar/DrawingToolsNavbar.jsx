/* eslint-disable react/prop-types */
import { useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import { HiOutlineMinus } from 'react-icons/hi';
import { PiRectangle, PiTextT } from 'react-icons/pi';
import { GoCircle, GoDiamond, GoArrowRight, GoPencil } from 'react-icons/go';

const ToolbarButton = ({ title, icon, onClick, isSelected }) => {
    return (
        <button
            title={title}
            onClick={onClick}
            className={`focus:outline-none focus:border-none hover:bg-purple-300 p-2 rounded-lg ${isSelected ? 'bg-purple-700 text-white hover:bg-purple-200' : ''}`}
        >
            {icon}
        </button>
    );
};

const DrawingToolsNavbar = ({ onModeChange, onColorChange, onReset }) => {
    const [selectedMode, setSelectedMode] = useState("rectangle");

    const buttons = [
        { title: 'Rectangle', icon: <PiRectangle />, onClick: () => handleModeChange('rectangle') },
        { title: 'Diamond', icon: <GoDiamond />, onClick: () => handleModeChange('diamond') },
        { title: 'Circle', icon: <GoCircle />, onClick: () => handleModeChange('circle') },
        { title: 'Line', icon: <HiOutlineMinus />, onClick: () => handleModeChange('line') },
        { title: 'Arrow', icon: <GoArrowRight />, onClick: () => handleModeChange('arrow') },
        { title: 'Pencil', icon: <GoPencil />, onClick: () => handleModeChange('pencil') },
        { title: 'Text', icon: <PiTextT />, onClick: () => handleModeChange('text') }
    ];

    const handleModeChange = (mode) => {
        onModeChange(mode);
        setSelectedMode(mode);
    };

    return (
        <div className="flex items-center gap-1 border p-1 rounded-xl shadow-sm mb-4">
            {buttons.map((button, index) => (
                <ToolbarButton key={`toolbar_button_${button.title}__${index}`} {...button} isSelected={button.title.toLowerCase() === selectedMode} />
            ))}
            <input className='w-8 outline-none border-none bg-transparent cursor-pointer' type="color" onChange={(e) => onColorChange(e.target.value)} />
            <ToolbarButton title="Undo" icon={<GrPowerReset />} onClick={onReset} isSelected={false} />
        </div>
    );
};

export default DrawingToolsNavbar;
