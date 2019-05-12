import React from 'react';
import classes from './BitsPaginator.module.css';

const BitsPaginator = () => {
    return (
        <div className={classes.BitsPaginator}>
            <div className={classes.Button}>first</div>
            <div className={classes.Button}>prev</div>
            <div className={classes.PageNumber}>5</div>
            <div className={classes.Button}>next</div>
            <div className={classes.Button}>last</div>
        </div>
    );
}

export default BitsPaginator;