import Footer from 'layouts/Footer';
import Header from 'layouts/Header';
import React from 'react';

const Layout: React.FC = ({ children }) => {
    return (
        <>
            <div id='layout'>
                <Header />
                {children}
                <Footer />
            </div>
            <style jsx global>
                {`:root {
                  --primaryColor: #112D4E;
                  --secondaryColor: #3F72AF;
                  --accentColor: #DBE2EF;
                  --backdropColor: #F9F7F7;

                  --successColor: rgb(76, 175, 80);
                  --successAccentColor: rgba(76, 175, 80, 0.1);
                  
                  --failedColor: rgb(239, 83, 80);
                  --failedAccentColor: rgba(239, 83, 80, 0.1);
                  
                  --warningColor: rgba(255, 152, 0);
                  --warningAccentColor: rgba(255, 152, 0, 0.1);

                  --informationColor: rgb(3, 169, 244);
                  --informationAccentColor: rgba(3, 169, 244, 0.1);

                  --whiteBackgroundColor: #FFF;

                  --primaryTextColor: #000;
                  --secondaryTextColor: #888;
                  --whiteTextColor: #FFF;

                  --verticalSpacing: 0.625rem;
                  --horizontalSpacing: 1rem;
                  --spacing: 0.625rem 1rem;
                  --radius: 0.313rem;

                  --tekoFont: 'Teko', sans-serif;

                  --shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
                }
                html,
                body {
                    font-family: 'Montserrat', sans-serif;
                }
                *, *::before, *::after {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }
                a {
                    color: inherit;
                    text-decoration: none;
                }
                span, p, h1, h2, h3, h4, h5, h6 {
                    margin: 0;
                    padding: 0
                }
                ul, li {
                    padding: 0;
                    margin: 0;
                    list-style-type: none
                }
                li {
                    display: inline-flex;
                    height: auto; 
                    width: auto
                }
                .main {
                    width: 100%;
                    height: 100%;
                }
                .container {
                    width: 100%;
                    height: 100%;
                }
                .section {
                    max-width: 1366px;
                    margin: auto;
                    padding: var(--spacing)
                }`}
            </style>
            <style jsx>
                {`#layout {
                    padding-top: 60px;
                }`}
            </style>
        </>

    )
}

export default Layout;