import React from 'react';

const Poll = ({ poll, vote }) => {
    const handleVote = (option) => {
        vote(poll.id, option);
    };

    return (
        <div>
            <h3>{poll.question}</h3>
            {poll.options.map((option, index) => (
                <button key={index} onClick={() => handleVote(index)}>{option}</button>
            ))}
        </div>
    );
};

export default Poll;
