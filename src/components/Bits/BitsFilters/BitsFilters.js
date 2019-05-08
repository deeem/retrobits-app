import React, { Component } from 'react';
import classes from './BitsFilters.module.css';
import Checkbox from '../../UI/Checkbox/Checkbox';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class bitsFilters extends Component {

    render() {
        return (
            <div className={classes.BitsFilters}>
            
                <h2>Players</h2>
                <Checkbox name="players1" value="1" changed={() => this.props.onToggleFilter('players_1')}/>
                <Checkbox name="players2" value="2" changed={() => this.props.onToggleFilter('players_2')}/>
    
                <h2>Difficult</h2>
                <Checkbox name="difficult_easy" value="easy" changed={() => this.props.onToggleFilter('difficult_easy')}/>
                <Checkbox name="difficult_normal" value="normal" changed={() => this.props.onToggleFilter('difficult_normal')}/>
                <Checkbox name="difficult_hard" value="hard" changed={() => this.props.onToggleFilter('difficult_hard')}/>
    
                <h2>Rating</h2>
                <Checkbox name="rating_1" value="1" changed={() => this.props.onToggleFilter('rating_1')}/>
                <Checkbox name="rating_2" value="2" changed={() => this.props.onToggleFilter('rating_2')}/>
                <Checkbox name="rating_3" value="3" changed={() => this.props.onToggleFilter('rating_3')}/>
                <Checkbox name="rating_4" value="4" changed={() => this.props.onToggleFilter('rating_4')}/>
                <Checkbox name="rating_5" value="5" changed={() => this.props.onToggleFilter('rating_5')}/>
    
                <h2>Order by</h2>
                <input type="checkbox" value="" />recently added<br />
                <input type="checkbox" value="" />most downloaded<br />
    
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        players_1: state.bitsFilter.players1,
        players_2: state.bitsFilter.players2,
        difficult_easy: state.bitsFilter.difficult_easy,
        difficult_normal: state.bitsFilter.difficult_normal,
        difficult_hard: state.bitsFilter.difficult_hard,
        rating_1: state.bitsFilter.rating_1,
        rating_2: state.bitsFilter.rating_2,
        rating_3: state.bitsFilter.rating_3,
        rating_4: state.bitsFilter.rating_4,
        rating_5: state.bitsFilter.rating_5,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleFilter: (filter) => dispatch(actions.toggleFilter(filter)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(bitsFilters);