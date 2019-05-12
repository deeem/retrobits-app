import React from 'react';
import classes from './BitsPaginator.module.css';

const BitsPaginator = (props) => {
    return (
        <div className={classes.BitsPaginator}>
            <div className={classes.Button}
                onClick={props.clickedFirst}>first</div>
            <div className={classes.Button}
                onClick={props.clickedPrev}>prev</div>
            <div className={classes.PageNumber}>{props.current}</div>
            <div className={classes.Button}
                onClick={props.clickedNext}>next</div>
            <div className={classes.Button}
                onClick={props.clickedLast}>last</div>
        </div>
    );
}

export default BitsPaginator;