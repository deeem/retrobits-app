import React from 'react';
import BitListItem from '../BitListItem/BitListItem';
import './BitList.css';

const BitList = (props) => {
    const list = props.bits.map(bit =>
        <BitListItem
            key={bit.id}
            data={bit}
            click={function () { return props.clicked(bit.id) }} />
    );

    return (
        <section className="bits">
            {list}
        </section>
    )
}

export default BitList;