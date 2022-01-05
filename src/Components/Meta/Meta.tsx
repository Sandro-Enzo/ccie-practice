import React from 'react';
import { IMeta } from '../../util/Interfaces';
import './Meta.css';

interface IMetaProps {
    meta: IMeta;
}

export default function Meta({ meta }: IMetaProps) {
    return (
        <div className='meta'>
            <h1 className='question-title'>{meta.title}</h1>
            <h2 className='question-type'>{meta.type}</h2>
            <h4 className='question-instruction'>{meta.instruction}</h4>
        </div>
    );
}
