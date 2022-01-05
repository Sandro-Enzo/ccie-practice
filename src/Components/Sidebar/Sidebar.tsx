import React, { useEffect, useState } from 'react';
import './Sidebar.css';

interface ISidebarProps {
    currentFile: string;
    setCurrentFile: React.Dispatch<React.SetStateAction<string>>;
    setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
}

export default function Sidebar({
    currentFile,
    setCurrentFile,
    setCurrentQuestionIndex,
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

        setCurrentFile(button.getAttribute('data-file') as string);
        setCurrentQuestionIndex(0);
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

                setCurrentFile(value);
                setCurrentQuestionIndex(0);
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
