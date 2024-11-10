import React from 'react';
import Poll from './Poll';

const PollList = ({ polls, vote }) => {
    return (
        <div>
            {polls.map((poll, index) => (
                <Poll key={index} poll={poll} vote={vote} />
            ))}
        </div>
    );
};

export default PollList;
