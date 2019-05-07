import React, { Component } from 'react'
import axios from '../../axios-retrobits';
import { connect } from 'react-redux';

import classes from './Explore.module.css';

import BitList from '../../components/Bits/BitList/BitList'
import BitInfo from '../../components/Bits/BitInfo/BitInfo'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import BitsFilters from '../../components/Bits/BitsFilters/BitsFilters'
import withErrorHandler from '../../components/UI/withErrorHandler/withErrorHanlder';


class Explore extends Component {
    state = {
        bits: null,
        bit: null,
        loading: false,
    }

    componentDidMount() {
        this.setState({ loading: true });

        this.fetchBits();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const shouldFetch =
            (prevProps.filter_players_1 !== undefined && prevProps.filter_players_1 !== this.props.filter_players_1)
            || (prevProps.filter_players_2 !== undefined && prevProps.filter_players_2 !== this.props.filter_players_2)
            || (prevProps.filter_difficult_easy !== undefined && prevProps.filter_difficult_easy !== this.props.filter_difficult_easy)
            || (prevProps.filter_difficult_normal !== undefined && prevProps.filter_difficult_normal !== this.props.filter_difficult_normal)
            || (prevProps.filter_difficult_hard !== undefined && prevProps.filter_difficult_hard !== this.props.filter_difficult_hard)
            || (prevProps.filter_rating_1 !== undefined && prevProps.filter_rating_1 !== this.props.filter_rating_1)
            || (prevProps.filter_rating_2 !== undefined && prevProps.filter_rating_2 !== this.props.filter_rating_2)
            || (prevProps.filter_rating_3 !== undefined && prevProps.filter_rating_3 !== this.props.filter_rating_3)
            || (prevProps.filter_rating_4 !== undefined && prevProps.filter_rating_4 !== this.props.filter_rating_4)
            || (prevProps.filter_rating_5 !== undefined && prevProps.filter_rating_5 !== this.props.filter_rating_5);

        if (shouldFetch) {
            this.fetchBits();
        }
    }

    prepareFetchFilterParams = () => {
        const players = [];
        const difficults = [];
        const ratings = [];

        if (this.props.filter_players_1) {
            players.push(1);
        }
        if (this.props.filter_players_2) {
            players.push(2);
        }
        if (this.props.filter_difficult_easy) {
            difficults.push('easy');
        }
        if (this.props.filter_difficult_normal) {
            difficults.push('normal');
        }
        if (this.props.filter_difficult_hard) {
            difficults.push('hard');
        }
        if (this.props.filter_rating_1) {
            ratings.push(1);
        }
        if (this.props.filter_rating_2) {
            ratings.push(2);
        }
        if (this.props.filter_rating_3) {
            ratings.push(3);
        }
        if (this.props.filter_rating_4) {
            ratings.push(4);
        }
        if (this.props.filter_rating_5) {
            ratings.push(5);
        }

        let filters = {};

        if (players.length) {
            filters['filter[players]'] = players.join(',');
        }

        if (difficults.length) {
            filters['filter[difficult]'] = difficults.join(',');
        }

        if (ratings.length) {
            filters['filter[rating]'] = ratings.join(',');
        }

        return filters;
    }

    fetchBits = () => {
        axios.get('/api/bits', {
            params: this.prepareFetchFilterParams()
        }).then(response => {
            this.setState({ bits: response.data.data });
        }).catch(error => {
            console.error(error);
        })
    }


    showBitModalHandler = (id) => {
        this.setState({ loading: true });

        axios.get('/api/bits/' + id)
            .then(response => {
                this.setState({ bit: response.data.data })
            });
    }

    hideBitModalHandler = () => {
        this.setState({ bit: null });
    }

    render() {

        let list = this.state.bits
            ? <BitList
                bits={this.state.bits}
                clicked={this.showBitModalHandler} />
            : null;

        let modal = this.state.bit
            ? <Modal
                show={this.state.bit.id}
                modalClosed={this.hideBitModalHandler}>
                <BitInfo
                    hide={this.hideBitModalHandler}
                    bit={this.state.bit} />
            </Modal>
            : null;

        return (
            <div className={classes.Explore}>
                <BitsFilters />

                {list}

                {modal}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        filter_players_1: state.filter_players_1,
        filter_players_2: state.filter_players_2,
        filter_difficult_easy: state.filter_difficult_easy,
        filter_difficult_normal: state.filter_difficult_normal,
        filter_difficult_hard: state.filter_difficult_hard,
        filter_rating_1: state.filter_rating_1,
        filter_rating_2: state.filter_rating_2,
        filter_rating_3: state.filter_rating_3,
        filter_rating_4: state.filter_rating_4,
        filter_rating_5: state.filter_rating_5,
    }
}

export default connect(mapStateToProps)(withErrorHandler(Explore, axios));