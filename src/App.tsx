import React, { useState } from 'react';
import './App.css';
import ModeSwitch from './Components/ModeSwitch/ModeSwitch';
import Question from './Components/Question/Question';
import Sidebar from './Components/Sidebar/Sidebar';
import convert from './util/csvToJson';
import { SwitchModes } from './util/enums';

function App() {
    const [currentFile, setCurrentFile] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [difficulty, setDifficulty] = useState(SwitchModes.easy);

    // console.log(
    //     'currentFile + currentFileName: ' + currentFile,
    //     currentFileName
    // );

    const questions = convert(currentFile);

    const question = questions.questions[currentQuestionIndex];

    // console.log('question: ' + question);

    return (
        <div className='App'>
            <Sidebar
                currentFile={currentFile}
                setCurrentFile={setCurrentFile}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
            <ModeSwitch difficulty={difficulty} setDifficulty={setDifficulty} />
            <Question
                question={question}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
                questionAmount={questions.questions.length}
            />
        </div>
    );
}

export default App;
