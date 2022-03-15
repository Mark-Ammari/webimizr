import Navbar from 'layouts/Navbar';
import React from 'react';

const Header = () => {
    const onScroll = (event: Event) => {
        let header = document.getElementById('header')
        if (window.scrollY > 0) { header!.style.boxShadow = 'var(--shadow)' }
        else { header!.style.boxShadow = 'none'}
    }
    React.useEffect(() => {
        document.addEventListener('scroll', onScroll)
        return () => document.removeEventListener('scroll', onScroll)
    }, [])

    return (
        <>
            <header id='header'>
                <Navbar />
            </header>
            <style jsx>
                {`#header {
                    height: 60px;
                    width: 100%;
                    position: fixed;
                    left: 0;
                    background-color: rgba(255, 255, 255, 0.9);
                    top: 0;
                    z-index: 2;
                    transition: ease-in-out 250ms
                }`}
            </style>
        </>
    )
}

export default Header;