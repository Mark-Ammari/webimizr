import React from 'react';

const Form: React.FC = ({ children }) => {
    return (
        <>
            <form  id='form-control'>
                {children}
            </form>
            <style jsx>
                {`#form-control {
                    width: 100%;
                    height: auto
                }`}
            </style>
        </>
    )
}

export default Form;