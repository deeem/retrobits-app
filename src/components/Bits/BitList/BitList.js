import React from 'react';
import BitListItem from '../BitListItem/BitListItem';
import classes from './BitList.module.css';

const BitList = (props) => {
    const list = props.bits.map(bit =>
        <BitListItem
            key={bit.id}
            data={bit}
            click={function () { return props.clicked(bit.id) }} />
    );

    return (
        <div className={classes.BitList}>
            {list}
        </div>
    )
}

export default BitList;