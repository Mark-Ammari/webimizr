import Error from 'public/icons/Error';
import React from 'react';

interface Props {
    errorMessage?: string,
    success?: boolean
}

const Message: React.FC<Props> = ({ success, errorMessage }) => {

    return <>
        {success ? null :
            <div className='message-container'>
                <div className='icon'><Error color='var(--failedColor)' margin='0 1rem 0 0'/></div>
                <p className='subheading'>{errorMessage}</p>
            </div>
        }
        <style jsx>
            {`.message-container {
                width: 100%;
                padding: var(--spacing);
                margin-bottom: 1rem;
                border-radius: var(--radius);
                background-color: var(--failedAccentColor);
                border: 1px solid #EEE;
                display: flex;
                align-items: center
            }
            .icon {
                width: 24px;
                height: 24px;
                margin-right: 1rem
            }
            .subheading {
                color: var(--failedColor);
                font-size: 1rem;
            }`}
        </style>
    </>
};

export default Message;