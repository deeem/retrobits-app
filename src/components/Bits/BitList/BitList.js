import React from 'react';
import BitListItem from '../BitListItem/BitListItem';
import BitsPaginator from '../BitsPaginator/BitsPaginator';
import classes from './BitList.module.css';

const BitList = (props) => {
    const list = props.bits.map(bit =>
        <BitListItem
            key={bit.id}
            data={bit}
            click={function () { return props.clicked(bit.id) }} />
    );

    return (
        <div>
            <BitsPaginator />
            <div className={classes.BitList}>
                {list}
            </div>
        </div>
    )
}

export default BitList;