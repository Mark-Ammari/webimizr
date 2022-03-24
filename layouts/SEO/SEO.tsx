import Head from 'next/head';
import React from 'react';

interface Props {
    title: string
    description: string
    keywords: string
    author: string
    canonical: string
    subject: string
}

const SEO: React.FC<Props> = ({ children, title, description, keywords, author, canonical, subject }) => {
    return (
        <Head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="robots" content="index,follow" />
            <meta name="visualback-id" content="33oh-xh9"></meta>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <link rel="canonical" href={`https://webimizr.herokuapp.com/${canonical}`} /> 
            <link rel="apple-touch-icon" href="/images/defaultProfile.png" />
            <meta name="subject" content={subject} />
            <meta name="copyright" content="Politispecs" />
            <meta name="revised" content="Janurary 15, 2022" />
            <meta name='classification' content='Politics' />
            <meta httpEquiv='Expires' content='0' />
            <meta httpEquiv='Pragma' content='no-cache' />
            <meta httpEquiv='Cache-Control' content='no-cache' />
            <meta httpEquiv='imagetoolbar' content='no' />
            <meta httpEquiv='x-dns-prefetch-control' content='off' />
            {/* <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@TWITTER_ID" />
            <meta name="twitter:title" content="TITLE" />
            <meta name="twitter:description" content="DESCRIPTION" />
            <meta name="twitter:creator" content="@CREATOR" />
            <meta name="twitter:image" content="IMAGE_FOR_TWITTER_CARD" />
            <meta property="og:title" content="TITLE" />
            <meta property="og:type" content="article" />
            <meta property="og:url" content="url" />
            <meta property="og:image" content="IMAGE_TO_USE" />
            <meta property="og:description" content="DESCRIPTION" />
            <meta property="og:site_name" content="SITE_NAME" /> */}
            {children}
        </Head>
    )
}

export default SEO;