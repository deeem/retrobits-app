import React from 'react';
import './BitListItem.css';

const BitListItem = (props) => {
    return (
        <div class="bit">
            <img className='bit__image' src={unescape(props.data.game.images[0].url)} />
            <h3 class="bit-info__bit-title">{props.data.title}</h3>
            <p class="bit-info__game-title">
                {props.data.game.title}
                <span className="bit-info__game-platform">
                    {props.data.game.platform.title}
                </span>
            </p>
            <button onClick={props.click}>Show Bit</button>
        </div>
    )
}

export default BitListItem;
