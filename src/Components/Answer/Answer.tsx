import React, { useEffect, useRef, useState } from 'react';
import { SwitchModes } from '../../util/enums';
import './Answer.css';

interface IAnswerProps {
    answer: string[];
    difficulty: SwitchModes;
}

export default function Answer({ answer, difficulty }: IAnswerProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const answerRef = useRef<HTMLDivElement>(null);

    const [hideIndex, setHideIndex] = useState(-1);
    const [handleHint, setHandleHint] = useState<() => void>(handleHintEasy);

    const [answerConvert, setAnswerConvert] = useState(
        new Array<number>(answer.length).fill(0)
    );

    document.documentElement.style.setProperty(
        '--columns',
        answer.length.toString()
    );

    useEffect(() => {
        const randnum = Math.floor(Math.random() * answer.length);

        setAnswerConvert(() => {
            return new Array<number>(answer.length).fill(0);
        });

        setHideIndex(randnum);
        (buttonRef.current as HTMLButtonElement).id = 'hint-button';

        if (inputRef.current) {
            (inputRef.current as HTMLInputElement).value = '';

            (inputRef.current as HTMLInputElement).className = 'answer-input';
        }

        (answerRef.current as HTMLDivElement)
            .querySelectorAll('div')
            .forEach((el) => (el.className = 'answer-div'));

        (
            (answerRef.current as HTMLDivElement).querySelectorAll(
                'input[type=text]'
            ) as NodeListOf<HTMLInputElement>
        ).forEach((el: HTMLInputElement) => (el.value = ''));
    }, [answer]);

    useEffect(() => {
        console.log('new difficulty ' + difficulty);

        setHandleHint((prev) => {
            console.log('' + prev == '' + handleHintEasy);
            return '' + prev == '' + handleHintEasy
                ? handleHintHard
                : handleHintEasy;
        });
    }, [difficulty]);

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

    function handleHintHard() {
        const inputs = answerRef.current?.querySelectorAll(
            'input[type=text]'
        ) as NodeListOf<HTMLInputElement>;

        if (inputs.length < 2) {
            setAnswerConvert((prev) => {
                let next = [...prev];
                next[prev.indexOf(0)] = 1;
                (buttonRef.current as HTMLButtonElement).id = '';
                return next;
            });
        }

        function recursion(next: number[]): number[] {
            const randnum = Math.floor(Math.random() * inputs.length);

            console.log(next[randnum]);

            if (next[randnum] !== 0) {
                recursion(next);
            } else {
                next[randnum] = 1;
                return next;
            }

            return [];
        }

        setAnswerConvert((prev) => {
            let next = [...prev];

            if (next.includes(0)) {
                next = recursion(next);
            }

            return next;
        });
    }

    function handleHintEasy() {
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
                if (
                    (difficulty === SwitchModes.hard &&
                        answerConvert[index] === 0) ||
                    (index === hideIndex && answerConvert[index] === 0)
                ) {
                    if (value.includes('(')) {
                        value = value.substring(0, value.indexOf('(') - 1);
                    }

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
                        <div
                            className={`answer-div ${
                                difficulty === SwitchModes.hard
                                    ? 'hint-div'
                                    : ''
                            }`}
                            key={index}
                        >
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
