import React, { useRef } from 'react';
import { IQuestion } from '../../util/Interfaces';
import Answers from '../Answers/Answers';
import Format from '../Format/Format';
import Meta from '../Meta/Meta';
import './Question.css';

interface IQuestionProps {
    question: IQuestion;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Question({
    question,
    setCurrentQuestionIndex,
}: IQuestionProps) {
    const questionContainer = useRef<HTMLDivElement>(null);

    function handleHint() {
        const hintButtons = (
            questionContainer.current as HTMLDivElement
        ).querySelectorAll('#hint-button') as NodeListOf<HTMLButtonElement>;

        const inputs = (
            questionContainer.current as HTMLDivElement
        ).querySelectorAll('.answer-input') as NodeListOf<HTMLButtonElement>;

        if (hintButtons.length === 0) return;

        const randnum = Math.floor(Math.random() * hintButtons.length);

        const index = Array.from(
            (inputs[randnum].parentElement as HTMLElement).children
        ).indexOf(inputs[randnum]);

        hintButtons[randnum].click();
        hintButtons[randnum].id = index.toString();
    }

    function handleSubmit() {
        const inputs = (
            questionContainer.current as HTMLDivElement
        ).querySelectorAll('input[type=text]') as NodeListOf<HTMLInputElement>;

        let correct = true;

        for (let i = 0; i < inputs.length; i++) {
            if (
                !(
                    inputs[i].value.toLowerCase() ===
                    (
                        inputs[i].getAttribute('data-value') as string
                    ).toLowerCase()
                )
            ) {
                if (inputs[i].value !== '')
                    inputs[i].classList.toggle('wrong-div', true);
                correct = false;
            }
        }

        if (!correct) return;

        setCurrentQuestionIndex((prev) => {
            return (prev + 1) % question.format.length;
        });
    }

    return (
        <div className='question-container-container'>
            {question && Object.keys(question).length !== 0 ? (
                <div className='question-container' ref={questionContainer}>
                    <Meta meta={question.meta} />
                    <Format format={question.format} />
                    <Answers answers={question.answers} />
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
