import React from 'react';
import { SwitchModes } from '../../util/enums';
import './ModeSwitch.css';

interface IModeSwitchProps {
    setDifficulty: React.Dispatch<React.SetStateAction<SwitchModes>>;
    difficulty: SwitchModes;
}

export default function ModeSwitch({
    difficulty,
    setDifficulty,
}: IModeSwitchProps) {
    function handleClick() {
        setDifficulty((prev) => {
            return prev === 'Easy' ? SwitchModes.hard : SwitchModes.easy;
        });
    }

    return (
        <div className='mode-switch-container'>
            <button
                className='utility-button mode-switch-button'
                onClick={handleClick}
            >
                {difficulty}
            </button>
        </div>
    );
}
