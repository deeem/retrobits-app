import React, { Component } from 'react';
import classes from './BitsFilters.module.css';
import Checkbox from '../../UI/Checkbox/Checkbox';
import { connect } from 'react-redux';

class bitsFilters extends Component {
    // state = {
    //     players1: false,
    //     players2: false,
    //     difficult_easy: false,
    //     difficult_normal: false,
    //     difficult_hard: false,
    //     rating_1: false,
    //     rating_2: false,
    //     rating_3: false,
    //     rating_4: false,
    //     rating_5: false,
    // }

    // todo: remove it not needed already
    handleChangeCheckbox = (event) => {
        this.setState({[event.target.name]: ! this.state[event.target.name]});
    }

    render() {
        return (
            <div className={classes.BitsFilters}>
            
                <h2>Players</h2>
                <Checkbox name="players1" value="1" changed={() => this.props.onToggleFilter('filter_players_1')}/>
                <Checkbox name="players2" value="2" changed={() => this.props.onToggleFilter('filter_players_2')}/>
    
                <h2>Difficult</h2>
                <Checkbox name="difficult_easy" value="easy" changed={() => this.props.onToggleFilter('filter_difficult_easy')}/>
                <Checkbox name="difficult_normal" value="normal" changed={() => this.props.onToggleFilter('filter_difficult_normal')}/>
                <Checkbox name="difficult_hard" value="hard" changed={() => this.props.onToggleFilter('filter_difficult_hard')}/>
    
                <h2>Rating</h2>
                <Checkbox name="rating_1" value="1" changed={() => this.props.onToggleFilter('filter_rating_1')}/>
                <Checkbox name="rating_2" value="2" changed={() => this.props.onToggleFilter('filter_rating_2')}/>
                <Checkbox name="rating_3" value="3" changed={() => this.props.onToggleFilter('filter_rating_3')}/>
                <Checkbox name="rating_4" value="4" changed={() => this.props.onToggleFilter('filter_rating_4')}/>
                <Checkbox name="rating_5" value="5" changed={() => this.props.onToggleFilter('filter_rating_5')}/>
    
                <h2>Order by</h2>
                <input type="checkbox" value="" />recently added<br />
                <input type="checkbox" value="" />most downloaded<br />
    
            </div>
        );
    }
};

const mapStateToProps = state => {
    return {
        filter_players_1: state.players1,
        filter_players_2: state.players2,
        filter_difficult_easy: state.difficult_easy,
        filter_difficult_normal: state.difficult_normal,
        filter_difficult_hard: state.difficult_hard,
        filter_rating_1: state.rating_1,
        filter_rating_2: state.rating_2,
        filter_rating_3: state.rating_3,
        filter_rating_4: state.rating_4,
        filter_rating_5: state.filter_rating_5,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onToggleFilter: (filter) => dispatch({type:'TOGGLE_FILTER', filter }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(bitsFilters);