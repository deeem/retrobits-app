import React from 'react';
import classes from './BitInfo.module.css';
import Button from '../../UI/Button/Button';
import BitInfoBadge from './BitInfoBagde/BitInfoBadge';
import difficultIcon from '../../../assets/images/iconfinder_sports-apparel-28_809670.svg';
import ratingIcon from '../../../assets/images/iconfinder_star_1348654.svg';
import playersIcon from '../../../assets/images/iconfinder_user-group-team-duo-partner_3209200.svg';

const bitInfo = (props) => (
    <div className={classes['bitinfo']}>

        <img className={classes['bitinfo__image']} src={unescape(props.bit.game.image)} />

        <h2 className={classes['bitinfo__title']}>{props.bit.title}</h2>

        <section className={classes['bitinfo__bit-description']}>
            <h3>Bit Description</h3>
            <p>{props.bit.game.description}</p>
        </section>

        <section className={classes['bitinfo__badges']}>
            <BitInfoBadge icon={playersIcon} text={props.bit.players}/>
            <BitInfoBadge icon={difficultIcon} text={props.bit.difficult}/>
            <BitInfoBadge icon={ratingIcon} text={props.bit.rating}/>
        </section>

        <Button clicked={props.hide}>Close</Button>

    </div>
);

export default bitInfo;