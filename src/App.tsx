import React, { useState } from 'react';
import './App.css';
import Question from './Components/Question/Question';
import Sidebar from './Components/Sidebar/Sidebar';
import convert from './util/csvToJson';

function App() {
    const [currentFile, setCurrentFile] = useState('');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    // console.log(
    //     'currentFile + currentFileName: ' + currentFile,
    //     currentFileName
    // );

    const question = convert(currentFile).questions[currentQuestionIndex];

    // console.log('question: ' + question);

    return (
        <div className='App'>
            <Sidebar
                currentFile={currentFile}
                setCurrentFile={setCurrentFile}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
            <Question
                question={question}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
        </div>
    );
}

export default App;
