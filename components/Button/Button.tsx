import React from 'react';

interface Props {
    variant?: 'filled' | 'outlined' | undefined 
    color?: 'dark' | 'green'
    disabled?: boolean | undefined
    margin?: string | number | undefined
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

const Button: React.FC<Props> = ({ children, color, disabled, variant, margin, onClick }) => {
    return (
        <>
            <button onClick={onClick} disabled={disabled} id='button'>{children}</button>
            <style jsx>
                {`#button {
                    margin: ${margin || 0};
                    padding: var(--spacing);
                    cursor: ${disabled ? 'not-allowed' : 'pointer'};
                    border-radius: var(--radius);
                    border: 1px solid ${disabled ? '#888' : color === 'dark' ? 'var(--primaryDarkColor)' : 'var(--primaryGreenColor)'};
                    background-color: ${disabled ? '#888' : variant === 'outlined' ? 'transparent' : color === 'dark' ? 'var(--primaryDarkColor)' : 'var(--primaryGreenColor)'};
                    color: ${disabled ? '#FFF' : variant === 'outlined' ? color === 'dark' ? 'var(--primaryDarkColor)' : 'var(--primaryGreenColor)' : '#FFF'};
                    transition: ease-in-out 250ms;
                    -moz-transition: none;
                    font-weight: bold
                }
                #button:hover {
                    background-color: ${disabled ? '#888' : variant === 'outlined' ? color === 'dark' ?  'rgba(10, 36, 88, 0.06)' : 'rgba(32, 193, 120, 0.06)' : variant === 'filled' ? color === 'dark' ? 'rgba(10, 36, 88, 0.9)' : 'rgba(32, 193, 120, 0.9)' : ''}
                }
                #button:active {
                    background-color: ${disabled ? '#888' : variant === 'outlined' ? color === 'dark' ?  'rgba(10, 36, 88, 0.12)' : 'rgba(32, 193, 120, 0.12)' : variant === 'filled' ? color === 'dark' ? 'rgba(10, 36, 88, 0.8)' : 'rgba(32, 193, 120, 0.8)' : ''}
                }`}
            </style>
        </>
    )
}

export default Button;