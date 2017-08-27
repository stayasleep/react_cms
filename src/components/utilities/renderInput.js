import React from 'react';

export default function renderInput({className, input, label, type, val, meta: {active, dirty, touched, error}}){
    return(
        <div>
        <input
            placeholder={label}
            type={type}
            className={className}
            value={val}
            {...input}

        />
        {touched && (error && <span>{error}</span>)}
        </div>

    )
}
