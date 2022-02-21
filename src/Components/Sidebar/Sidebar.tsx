import React, { useEffect, useState } from 'react';
import convert from '../../util/csvToJson';
import { SwitchModes } from '../../util/enums';
import './Sidebar.css';

interface ISidebarProps {
    currentFile: string;
    difficulty: SwitchModes;
    setCurrentFile: React.Dispatch<React.SetStateAction<string>>;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
    setNumberOfInputs: React.Dispatch<React.SetStateAction<number>>;
}

export default function Sidebar({
    currentFile,
    difficulty,
    setCurrentFile,
    setCurrentQuestionIndex,
    setNumberOfInputs,
}: ISidebarProps) {
    const [files, setFiles] = useState<string[]>([]);
    const [filenames, setFilenames] = useState<string[]>([]);

    useEffect(() => {
        // Initialise files on start
        if (localStorage.getItem('files') === null) return;

        const lsFiles = localStorage.getItem('files') as string;

        const filesArray = lsFiles.includes(' ')
            ? lsFiles.split(' ')
            : [lsFiles];

        const temp: string[] = [];

        filesArray.forEach((value, index) => {
            const data = localStorage.getItem(value) as string;
            temp.push(data);
        });

        setFiles(temp);
        setFilenames(filesArray);
    }, []);

    function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        const button = e.target as HTMLButtonElement;

        setNewFile(button.getAttribute('data-file') as string);
    }

    function inputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const inputElement = e.target as HTMLInputElement;

        if (inputElement.files?.length === 0) return;

        const objUrl = URL.createObjectURL(inputElement.files?.item(0) as File);

        fetch(objUrl).then((res) => {
            res.text().then((value) => {
                if (files.includes(value)) {
                    alert('File with same content already exists!');
                    return;
                }

                const fileName = (
                    (inputElement.files as FileList).item(0) as File
                ).name;

                setNewFile(value);

                setFiles((prev) => {
                    return [...prev, value];
                });
                setFilenames((prev) => {
                    return [...prev, fileName];
                });

                // Add stuff to localstorage
                let string = '';

                if (localStorage.getItem('files') !== null) {
                    string = localStorage.getItem('files') + ' ' + fileName;
                } else {
                    string = fileName;
                }

                localStorage.setItem('files', string);

                localStorage.setItem(fileName, value);
            });
        });
    }

    function setNewFile(value: string) {
        setCurrentFile(value);
        setCurrentQuestionIndex(0);

        const obj = convert(value);

        let noi = 0;

        if (difficulty === SwitchModes.easy) {
            obj.questions.forEach((value) => {
                noi += value.answers.length;
            });
        } else if (difficulty === SwitchModes.hard) {
            obj.questions.forEach((value) => {
                let intermediate = 0;
                value.answers.forEach(
                    (value) => (intermediate += value.length)
                );
                noi += intermediate;
            });
        }

        setNumberOfInputs(noi);
    }

    useEffect(() => {
        const obj = convert(currentFile);

        console.dir(obj);

        let noi = 0;

        if (difficulty === SwitchModes.easy) {
            obj.questions.forEach((value) => {
                noi += value.answers.length;
            });
        } else if (difficulty === SwitchModes.hard) {
            obj.questions.forEach((value) => {
                let intermediate = 0;
                value.answers.forEach(
                    (value) => (intermediate += value.length)
                );
                noi += intermediate;
            });
        }

        setNumberOfInputs(noi);
    }, [difficulty]);

    function handleClear() {
        setFiles([]);
        setFilenames([]);
        setCurrentFile('');

        // Remove everything from localstorage
        if (localStorage.getItem('files') === null) return;

        const lsFiles = localStorage.getItem('files') as string;

        const filesArray = lsFiles.includes(' ')
            ? lsFiles.split(' ')
            : [lsFiles];

        filesArray.forEach((value, index) => {
            localStorage.removeItem(value);
        });

        localStorage.removeItem('files');
    }

    function handleDeselect() {
        setCurrentFile('');
    }

    return (
        <div className='sidebar-container'>
            <span className='top-text'>Previous files</span>
            <div className='sidebar'>
                {files.map((file, index, array) => {
                    return (
                        <button
                            className='file-item'
                            key={index}
                            onClick={handleClick}
                            data-file={file}
                        >
                            {filenames[index]}
                        </button>
                    );
                })}
            </div>
            <button
                className='utility-button deselect'
                onClick={handleDeselect}
            >
                Deselect
            </button>
            <label className='utility-button file-input-label'>
                Add File
                <input
                    type='file'
                    className='file-input'
                    onChange={inputChange}
                    accept='.csv'
                />
            </label>
            <button
                className='clear-local utility-button'
                onClick={handleClear}
            >
                Clear
            </button>
        </div>
    );
}
