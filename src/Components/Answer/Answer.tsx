import React, { useEffect, useRef, useState } from 'react';
import './Answer.css';

interface IAnswerProps {
    answer: string[];
}

export default function Answer({ answer }: IAnswerProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const answerRef = useRef<HTMLDivElement>(null);

    const [hideIndex, setHideIndex] = useState(-1);

    document.documentElement.style.setProperty(
        '--columns',
        answer.length.toString()
    );

    useEffect(() => {
        const randnum = Math.floor(Math.random() * answer.length);

        setHideIndex(randnum);
        (buttonRef.current as HTMLButtonElement).id = 'hint-button';

        if (inputRef.current) {
            (inputRef.current as HTMLInputElement).value = '';

            (inputRef.current as HTMLInputElement).className = 'answer-input';
        }

        (answerRef.current as HTMLDivElement)
            .querySelectorAll('div')
            .forEach((el) => (el.className = 'answer-div'));
    }, [answer]);

    useEffect(() => {
        try {
            const index = parseInt((buttonRef.current as HTMLButtonElement).id);

            (
                Array.from((answerRef.current as HTMLDivElement).children)[
                    index
                ] as HTMLDivElement
            ).classList.toggle('hint-div', true);
        } catch {}
    }, [hideIndex]);

    function handleHint() {
        setHideIndex(-1);
    }

    function handleChange() {
        if ((inputRef.current as HTMLInputElement).value !== '') {
            (buttonRef.current as HTMLButtonElement).id = '';
        } else {
            (buttonRef.current as HTMLButtonElement).id = 'hint-button';
        }

        (inputRef.current as HTMLInputElement).className = 'answer-input';
    }

    return (
        <div className='answer' ref={answerRef}>
            {answer.map((value, index) => {
                if (index === hideIndex) {
                    return (
                        <input
                            ref={inputRef}
                            key={index}
                            type='text'
                            className='answer-input'
                            placeholder='...'
                            data-value={value}
                            onChange={handleChange}
                        />
                    );
                } else {
                    return (
                        <div className='answer-div' key={index}>
                            {value}{' '}
                        </div>
                    );
                }
            })}
            <button
                id='hint-button'
                className='hint-button'
                onClick={handleHint}
                ref={buttonRef}
                tabIndex={-1}
            >
                hint
            </button>
        </div>
    );
}
