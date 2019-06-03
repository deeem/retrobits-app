import React from 'react';
import classes from './BitInfoGameToggler.module.css';
import questionIcon from '../../../../assets/images/iconfinder-question.svg';

const BitInfoGameToggler = (props) => {
    return (
        <div className={classes['game-toggler']}>
            <h3 className={classes['game-toggler__title']}>{props.title}</h3>
            <img
                className={classes['game-toggler__icon']}
                src={questionIcon}
                alt="question icon"
                onClick={props.clicked}
            />
        </div>
    );
}

export default BitInfoGameToggler;