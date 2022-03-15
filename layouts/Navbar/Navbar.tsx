import Logo from 'components/Logo';
import React from 'react';

const Navbar: React.FC = () => {
    return (
        <>
            <nav id='navigation-bar' className='section'>
                <ul className='navigation-list'>
                    <li><Logo /></li>
                </ul>
                <ul className='navigation-list'>
                    {/* <li><Button variant='filled' color='green'>Support Us</Button></li> */}
                </ul>
            </nav>
            <style jsx>
                {`#navigation-bar{
                    padding: 0 var(--horizontalSpacing);
                    height: 100%;
                    max-width: 1366px;
                    margin: auto;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }
                #navigation-list {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between
                }`}
            </style>
        </>
    )
}

export default Navbar;