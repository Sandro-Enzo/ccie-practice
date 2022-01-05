import React from 'react';
import './Format.css';

interface IFormatProps {
    format: string[];
}

export default function Format({ format }: IFormatProps) {
    return (
        <div className='format-container'>
            {format.map((value, index) => {
                return (
                    <div key={index} className='format-item'>
                        {value}{' '}
                    </div>
                );
            })}
        </div>
    );
}
