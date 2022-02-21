import React, { FC } from 'react';
import { SwitchModes } from '../../util/enums';

interface IStatsProps {
    numberOfInputs: number;
    numberOfCorrectInputs: number;
}

const Stats: FC<IStatsProps> = ({ numberOfInputs, numberOfCorrectInputs }) => {
    return <div>{`${numberOfCorrectInputs} / ${numberOfInputs}`}</div>;
};

export default Stats;
