import ListItem from 'components/ListItem';
import ArrowUp from 'public/icons/ArrowUp';
import React from 'react';

interface Props {
    padding?: string | number | undefined
    margin?: string | number | undefined
    isCollapsible?: boolean | undefined
    isShadow?: boolean | undefined
    startAdornment?: any | undefined
    radius?: boolean | undefined
    href?: string | undefined
    title?: string | undefined
    onClick?: any | undefined
    position?: 'static' | 'relative' | 'absolute' | undefined
    top?: string | number | undefined
    bottom?: string | number | undefined
    right?: string | number | undefined
    left?: string | number | undefined
    maxWidth?: string | number | undefined
}

const List: React.FC<Props> = ({ children, radius, margin, padding, isCollapsible, isShadow, startAdornment, onClick, title, position, top, bottom, left, right, maxWidth }) => {
    const [expand, setExpand] = React.useState(false);

    const expandCollapseHandler = () => {
        setExpand(!expand)
    }

    return (
        <>
            {isCollapsible ?
                <div id='dropdown'>
                    <ListItem
                        startAdornment={startAdornment}
                        onClick={() => { expandCollapseHandler(); onClick ? onClick() : null }}
                        endAdornment={
                            <span id='arrow' className={`${expand ? 'expand' : 'collapse'}`}>
                                <ArrowUp size='18px' color='#888' />
                            </span>
                        }
                    >
                        {title}
                    </ListItem>
                    <ul id='list' className={`collapsible-list ${expand ? 'expand-list' : 'collapse-list'}`}>
                        {children}
                    </ul>
                </div>
                :
                <ul id='list'>
                    {children}
                </ul>
            }
            <style jsx>
                {`#dropdown {
                    box-shadow: ${isShadow ? 'var(--shadow)' : 'none'};
                    margin: ${margin || 0};
                    border-radius ${radius ? 'var(--radius)' : 0};
                    height: auto;
                }
                #list {
                    padding: ${padding || 0};
                    transition: ease-in-out 250ms;
                    position: ${position || 'static'};
                    top: ${top || 'auto'};
                    bottom: ${bottom || 'auto'};
                    right: ${right || 'auto'};
                    left: ${left || 'auto'};
                    background-color: var(--whiteBackgroundColor);
                    z-index: 3;
                    border-radius: var(--radius);
                    max-width: ${maxWidth || '100%'};
                    height: auto;
                    border-radius ${radius ? 'var(--radius)' : 0}
                }
                #arrow {
                    transition: 250ms;
                    width: 18px;
                    height: 18px;
                }
                .expand {
                    transform: rotate(180deg)
                }
                .collapse {
                    transform: rotate(0deg);
                }
                .expand-list {
                    visibility: show;
                    opacity: 1;
                    max-height: 1000px;
                }
                .collapse-list {
                    visibility: hidden;
                    opacity: 0;
                    max-height: 0;
                }`}
            </style>
        </>

    )
}

export default List;