import Divider from 'components/Divider';
import List from 'components/List';
import ListItem from 'components/ListItem';
import AuditBullet from 'public/charts/AuditBullet';
import React from 'react';

interface Props {
    score?: number | null | undefined
    title?: string | undefined
    description?: string | undefined
    displayValue?: string | undefined
    loading: boolean
    error: boolean
}

const AuditList: React.FC<Props> = ({ title, displayValue, description, score, loading, error }) => {
    return (
        <>
            <List margin='0 0 .5rem 0' title={title} isShadow startAdornment={<AuditBullet loading={loading} error={error} type='score' margin='0 1rem 0 0' score={score} />} isCollapsible>
                <Divider />
                <ListItem>{description}</ListItem>
                {displayValue ? <ListItem>– {displayValue}</ListItem> : null}
            </List>
        </>
    )
}

export default AuditList;