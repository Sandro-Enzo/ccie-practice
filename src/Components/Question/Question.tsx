import React, { useEffect, useRef, useState } from 'react';
import { SwitchModes } from '../../util/enums';
import { IQuestion } from '../../util/Interfaces';
import Answers from '../Answers/Answers';
import Format from '../Format/Format';
import Meta from '../Meta/Meta';
import Stats from '../Stats/Stats';
import './Question.css';

interface IQuestionProps {
    question: IQuestion;
    difficulty: SwitchModes;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    setNumberOfCorrectInputs: React.Dispatch<React.SetStateAction<number>>;
    questionAmount: number;
    numberOfInputs: number;
    numberOfCorrectInputs: number;
}

export default function Question({
    question,
    difficulty,
    setCurrentQuestionIndex,
    setNumberOfCorrectInputs,
    questionAmount,
    numberOfInputs,
    numberOfCorrectInputs,
}: IQuestionProps) {
    const questionContainer = useRef<HTMLDivElement>(null);

    const [numberCorrect, setNumberCorrect] = useState(-1);

    useEffect(() => {
        setNumberCorrect(-1);
    }, [question]);

    function handleHint() {
        const hintButtons = (
            questionContainer.current as HTMLDivElement
        ).querySelectorAll('#hint-button') as NodeListOf<HTMLButtonElement>;

        const inputs = (
            questionContainer.current as HTMLDivElement
        ).querySelectorAll('.answer-input') as NodeListOf<HTMLButtonElement>;

        if (hintButtons.length === 0) return;

        const randnum = Math.floor(Math.random() * hintButtons.length);

        let index: number;

        try {
            hintButtons[randnum].click();

            index = Array.from(
                (inputs[randnum].parentElement as HTMLElement).children
            ).indexOf(inputs[randnum]);

            if (difficulty === SwitchModes.easy) {
                hintButtons[randnum].id = index.toString();
            }
        } catch {}
    }

    function handleSubmit() {
        const firstSubmit = numberCorrect === -1;

        const inputs = (
            questionContainer.current as HTMLDivElement
        ).querySelectorAll('input[type=text]') as NodeListOf<HTMLInputElement>;

        let correct = true;

        let numCorrect = 0;

        for (let i = 0; i < inputs.length; i++) {
            if (
                !(
                    inputs[i].value.toLowerCase() ===
                    (
                        inputs[i].getAttribute('data-value') as string
                    ).toLowerCase()
                )
            ) {
                if (inputs[i].value !== '') {
                    inputs[i].classList.toggle('wrong-div', true);
                }
                correct = false;
            } else {
                numCorrect++;
            }
        }

        if (firstSubmit) {
            setNumberCorrect(numCorrect);
        }

        if (!correct) {
            return;
        }

        setNumberOfCorrectInputs((prev) => {
            return prev + numberCorrect;
        });

        setCurrentQuestionIndex((prev) => {
            return (prev + 1) % questionAmount;
        });
    }

    return (
        <div className='question-container-container'>
            {question && Object.keys(question).length !== 0 ? (
                <div className='question-container' ref={questionContainer}>
                    <Stats
                        numberOfInputs={numberOfInputs}
                        numberOfCorrectInputs={numberOfCorrectInputs}
                    />
                    <Meta meta={question.meta} />
                    <Format format={question.format} />
                    <Answers
                        answers={question.answers}
                        difficulty={difficulty}
                    />
                    <div className='button-container'>
                        <button
                            className='submit utility-button'
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                        <button
                            className='hint utility-button'
                            onClick={handleHint}
                        >
                            Hint
                        </button>
                    </div>
                </div>
            ) : (
                ''
            )}
        </div>
    );
}
