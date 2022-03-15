import Divider from 'components/Divider';
import Tab from 'components/Tab';
import TabContent from 'components/TabContent';
import React from 'react';

interface Values {
    title: string
    element: any
}

interface Props {
    data: Values[] | undefined
}

const Tablet: React.FC<Props> = ({ data }) => {
    const [active, setActive] = React.useState('Performance')
    const radioChangedHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActive(event.target.value)
    }

    return (
        <>
            <div role='tablist' id='tablet'>
                <div id='tabs'>
                    {data?.map((tab: Values, index) => {
                        return <Tab key={index} value={tab.title} onChange={radioChangedHandler} checked={active === tab.title} />
                    })}
                </div>
                <Divider maxWidth='1366px'/>
                {data?.map((tab: Values, index) => {
                    return <TabContent key={index} checked={active === tab.title}>
                        {tab.element}
                    </TabContent>
                })}
            </div>
            <style jsx>
                {`#tablet {
                    display: flex;
                    flex-direction: column;
                    justify-content: flex-start;
                    width: 100%;
                    margin: auto;
                    position: relative;
                    overflow-x: hidden;
                    z-index: 0
                }
                #tabs {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    overflow-y: hidden;
                    overflow-x: auto;
                    width: 100%;
                    -ms-overflow-style: none; /* for Internet Explorer, Edge */
                    scrollbar-width: none; /* for Firefox */
                }
                #tabs::-webkit-scrollbar {
                    display: none
                }`}
            </style>
        </>
    )
}

export default Tablet;