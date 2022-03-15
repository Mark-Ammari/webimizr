import React, { HTMLInputTypeAttribute } from 'react';

interface Props {
    type?: HTMLInputTypeAttribute | undefined;
    margin?: string | number | undefined;
    width?: string | number | undefined;
    endAdornment?: any | undefined
    value?: string | number | readonly string[] | undefined
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

const TextField: React.FC<Props> = ({ children, type, value, onChange, margin, endAdornment }) => {
    return (
        <>
            <div id='input-container' className='container'>
                <label id='input-label'>{children}</label>
                <input value={value} onChange={onChange} type={type} id='input-field' placeholder="Search" />
                {endAdornment ? <span aria-hidden='true' id='end-adornment'>{endAdornment}</span> : null}
            </div>
            <style jsx>
                {`#input-container {
                    display: inline-block;
                    position: relative;
                    max-width: 500px;
                    margin: ${margin || '0 1rem'}
                }
                #input-label {
                    position: absolute;
                    visibility: hidden;
                }
                #input-field {
                    width: inherit;
                    padding: var(--spacing);
                    outline: none;
                    border: 1px solid #888;
                    border-radius: var(--radius);
                    padding-right: ${endAdornment ? '2.5rem' : '1rem'};
                }
                #input-field::-webkit-input-placeholder { /* Chrome/Opera/Safari */
                    font-family: 'Montserrat', sans-serif;
                    color: #888
                }
                #input-field::-moz-placeholder { /* Firefox 19+ */
                    font-family: 'Montserrat', sans-serif;
                    color: #888
                }
                #input-field:-ms-input-placeholder { /* IE 10+ */
                    font-family: 'Montserrat', sans-serif;
                    color: #888
                }
                #input-field:-moz-placeholder { /* Firefox 18- */
                    font-family: 'Montserrat', sans-serif;
                    color: #888
                }
                #end-adornment {
                    position: absolute;
                    right: 7.5px;
                    top: 0px;
                    display: flex;
                    align-items: center;
                    justify-content: center;      
                    border-radius: 0 var(--radius) var(--radius) 0;
                    height: 100%;
                    width: 32px;
                }
                #input-field:focus {
                    border: 1px solid var(--primaryGreenColor)
                }`}
            </style>
        </>
    )
}

export default TextField;