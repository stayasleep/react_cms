import React from 'react';

export default function renderInput({className, input, label, type, val, meta: {active, dirty, touched, error}}){
    return(
        <input
            placeholder={label}
            type={type}
            value={val}
            className={className}
            {...input}

        />
    )
}