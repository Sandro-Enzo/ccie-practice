import React from 'react';
import { SwitchModes } from '../../util/enums';
import Answer from '../Answer/Answer';
import './Answers.css';

interface IAnswersProps {
    answers: string[][];
    difficulty: SwitchModes;
}

export default function Answers({ answers, difficulty }: IAnswersProps) {
    return (
        <div className='answers'>
            {answers.map((value, index) => {
                return (
                    <Answer
                        answer={value}
                        key={index}
                        difficulty={difficulty}
                    />
                );
            })}
        </div>
    );
}
