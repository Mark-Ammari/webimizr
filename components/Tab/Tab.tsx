import React from 'react';

interface Props {
    checked?: boolean | undefined
    onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
    value?: string | number | readonly string[] | undefined
}

const Tab: React.FC<Props> = ({ checked, onChange, value }) => {
    return (
        <>
            <div className='tab'>
                <input value={value} type='radio' onChange={onChange} name='tab' checked={checked} className='tab-field' id={value as string} />
                <label htmlFor={value as string} className='tab-label'>{value}</label>
            </div>
            <style jsx>
                {`.tab {
                    white-space: nowrap
                }
                .tab-label {
                    padding: var(--spacing);
                    width: auto;
                    cursor: pointer;
                    display: flex;
                    color: var(--primaryColor);
                    align-items: center;
                    border-bottom: 3px solid transparent;
                    border-radius: .25rem .25rem 0 0
                }
                .tab-field {
                    width: 100%;
                    display: none
                }
                .tab-field:checked+.tab-label {
                    background-color: var(--accentColor);
                    border-bottom: 3px solid var(--secondaryColor)
                }`}
            </style>
        </>
    )
}

export default Tab;