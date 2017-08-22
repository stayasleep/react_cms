import React from 'react';

export default function renderInput({input, label, type, val, meta: {active, dirty, touched, error}}){
    return(
        <input
            placeholder={label}
            type={type}
            value={val}
            {...input}

        />
    )
}