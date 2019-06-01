import React, { Component } from 'react';
import './BitsFilters.css';
import Checkbox from '../../UI/Checkbox/Checkbox';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class bitsFilters extends Component {

    render() {

        let containerClasses = ['filter-container'];
        if (this.props.visible) {
            containerClasses.push('open');
        }

        return (
            <>
                <div className={containerClasses}>

                    <div class="filter-groups">
                        <div class="filter-group">
                            <p class="filter-group__title">Platform</p>
                            <ul class="filter-group__items">
                                <li class="filter-group__item">
                                    <Checkbox changed={() => this.props.onToggleFilter('platform_spectrum')} />
                                </li>
                                <li class="filter-group__item">
                                    <Checkbox changed={() => this.props.onToggleFilter('platform_nes')} />
                                </li>
                                <li class="filter-group__item">
                                    <Checkbox changed={() => this.props.onToggleFilter('platform_snes')} />
                                </li>
                                <li class="filter-group__item">
                                    <Checkbox changed={() => this.props.onToggleFilter('platform_sega')} />
                                </li>
                            </ul>
                        </div>
                        <div class="filter-group">
                            <p class="filter-group__title">Players</p>
                            <ul class="filter-group__items">
                                <li class="filter-group__item">
                                    <Checkbox name="players1" value="1" changed={() => this.props.onToggleFilter('players_1')} isChecked={this.props.players_1} />
                                </li>
                                <li class="filter-group__item">
                                    <Checkbox name="players2" value="2" changed={() => this.props.onToggleFilter('players_2')} />
                                </li>
                            </ul>
                        </div>
                        <div class="filter-group">
                            <p class="filter-group__title">Difficult</p>
                            <ul class="filter-group__items">
                                <li class="filter-group__item">
                                    <Checkbox name="difficult_easy" value="easy" changed={() => this.props.onToggleFilter('difficult_easy')} isChecked={this.props.difficult_easy} />
                                </li>
                                <li class="filter-group__item">
                                    <Checkbox name="difficult_normal" value="normal" changed={() => this.props.onToggleFilter('difficult_normal')} />
                                </li>
                                <li class="filter-group__item">
                                    <Checkbox name="difficult_hard" value="hard" changed={() => this.props.onToggleFilter('difficult_hard')} />
                                </li>
                            </ul>
                        </div>
                        <div class="filter-group">
                            <p class="filter-group__title">Sorting</p>
                            <ul class="filter-group__items">
                                <li class="filter-group__item"><label><input type="radio" name="sorting" />newest</label></li>
                                <li class="filter-group__item"><label><input type="radio" name="sorting" />popular</label></li>
                            </ul>
                        </div>
                    </div>

                </div>

            </>
        );
    }
};

const mapStateToProps = state => {
    return {
        platform_spectrum: state.bitsFilter.platform_spectrum,
        platform_nes: state.bitsFilter.platform_nes,
        platform_snes: state.bitsFilter.platform_snes,
        platform_sega: state.bitsFilter.platform_sega,
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