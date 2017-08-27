import React from 'react';

export default function renderInput({className, input, label, type, val, meta: {active, dirty, touched, error}}){
    return(
        <div>
        <input
            placeholder={label}
            type={type}
            value={val}
            className={className}
            {...input}

        />
        {touched && (error && <span>{error}</span>)}
        </div>

    )
}
