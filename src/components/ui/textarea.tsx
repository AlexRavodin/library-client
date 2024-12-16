import React from 'react';

interface TextareaProps extends React.HTMLAttributes<HTMLTextAreaElement> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const Textarea: React.FC<TextareaProps> = ({ value, onChange, ...rest }) => {
    return (
        <textarea value={value} onChange={onChange} {...rest} />
    );
};

export default Textarea;