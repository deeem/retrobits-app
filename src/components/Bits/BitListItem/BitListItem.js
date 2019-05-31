import React from 'react';
import './BitListItem.css';

const BitListItem = (props) => {
    return (
        <div class="bit">
            <div class="bit__image"></div>

            <h3 class="bit-info__bit-title">{props.data.title}</h3>
            <p class="bit-info__game-title">{props.data.game.title}</p>
            <span class="bit-info__bit-difficult">normal</span>
            <span class="bit-info__bit-author">normal</span>
            <button onClick={props.click}>Show Bit</button>
        </div>
    )
}

export default BitListItem;