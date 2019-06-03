import React, { Component } from 'react';
import classes from './BitInfo.module.css';
import Button from '../../UI/Button/Button';
import BitInfoBadge from './BitInfoBagde/BitInfoBadge';
import BitInfoGameToggler from './BitInfoGameToggler/BitInfoGameToggler';
import BitInfoGameInfo from './BitInfoGameInfo/BitInfoGameInfo';
import difficultIcon from '../../../assets/images/iconfinder_sports-apparel-28_809670.svg';
import ratingIcon from '../../../assets/images/iconfinder_star_1348654.svg';
import playersIcon from '../../../assets/images/iconfinder_user-group-team-duo-partner_3209200.svg';


class BitInfo extends Component {
    state = {
        isGameInfoVisible: false,
    }

    handleToggleGameInfo = () => {
        this.setState({ isGameInfoVisible: !this.state.isGameInfoVisible });
    }

    componentDidUpdate() {
        console.log('asdfasdf');
    }

    render() {
        return (
            <div className={classes['bitinfo']}>

                <img className={classes['bitinfo__image']} src={unescape(this.props.bit.game.image)} />
                <BitInfoGameToggler title={this.props.bit.game.title} clicked={this.handleToggleGameInfo} />


                {this.state.isGameInfoVisible &&
                    <BitInfoGameInfo platform={this.props.bit.game.platform.title} description={this.props.bit.game.description} />
                }

                <h2 className={classes['bitinfo__title']}>{this.props.bit.title}</h2>

                <section className={classes['bitinfo__bit-description']}>
                    <h3>Bit Description</h3>
                    <p>{this.props.bit.game.description}</p>
                </section>

                <section className={classes['bitinfo__badges']}>
                    <BitInfoBadge icon={playersIcon} text={this.props.bit.players} />
                    <BitInfoBadge icon={difficultIcon} text={this.props.bit.difficult} />
                    <BitInfoBadge icon={ratingIcon} text={this.props.bit.rating} />
                </section>

                <Button clicked={this.props.hide}>Close</Button>

            </div>
        );
    }
}

export default BitInfo;