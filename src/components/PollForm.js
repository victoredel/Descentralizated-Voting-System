import React, { useState } from 'react';

const PollForm = ({ createPoll }) => {
    const [question, setQuestion] = useState('');
    const [options, setOptions] = useState(['', '']);

    const handleChangeOption = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createPoll(question, options);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Pregunta:</label>
                <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)} required />
            </div>
            {options.map((option, index) => (
                <div key={index}>
                    <label>Opción {index + 1}:</label>
                    <input type="text" value={option} onChange={(e) => handleChangeOption(index, e.target.value)} required />
                </div>
            ))}
            <button type="button" onClick={handleAddOption}>Añadir Opción</button>
            <button type="submit">Crear Encuesta</button>
        </form>
    );
};

export default PollForm;
