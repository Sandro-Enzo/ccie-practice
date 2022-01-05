import React from 'react';
import Answer from '../Answer/Answer';
import './Answers.css';

interface IAnswersProps {
    answers: string[][];
}

export default function Answers({ answers }: IAnswersProps) {
    return (
        <div className='answers'>
            {answers.map((value, index) => {
                return <Answer answer={value} key={index} />;
            })}
        </div>
    );
}
