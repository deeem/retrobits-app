import React, { Component } from 'react'
import { connect } from 'react-redux';

import classes from './Explore.module.css';
import axios from '../../axios-retrobits';
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
        url: '/api/bits',
        pagination: [],
    }

    componentDidMount() {
        this.fetchBits();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

        const shouldFetch =
            (prevProps.players_1 !== undefined && prevProps.players_1 !== this.props.players_1)
            || (prevProps.players_2 !== undefined && prevProps.players_2 !== this.props.players_2)
            || (prevProps.difficult_easy !== undefined && prevProps.difficult_easy !== this.props.difficult_easy)
            || (prevProps.difficult_normal !== undefined && prevProps.difficult_normal !== this.props.difficult_normal)
            || (prevProps.difficult_hard !== undefined && prevProps.difficult_hard !== this.props.difficult_hard)
            || (prevProps.rating_1 !== undefined && prevProps.rating_1 !== this.props.rating_1)
            || (prevProps.rating_2 !== undefined && prevProps.rating_2 !== this.props.rating_2)
            || (prevProps.rating_3 !== undefined && prevProps.rating_3 !== this.props.rating_3)
            || (prevProps.rating_4 !== undefined && prevProps.rating_4 !== this.props.rating_4)
            || (prevProps.rating_5 !== undefined && prevProps.rating_5 !== this.props.rating_5);

        if (shouldFetch) {
            this.fetchBits();
        }
    }

    prepareFetchFilterParams = () => {
        const players = [];
        const difficults = [];
        const ratings = [];

        if (this.props.players_1) {
            players.push(1);
        }
        if (this.props.players_2) {
            players.push(2);
        }
        if (this.props.difficult_easy) {
            difficults.push('easy');
        }
        if (this.props.difficult_normal) {
            difficults.push('normal');
        }
        if (this.props.difficult_hard) {
            difficults.push('hard');
        }
        if (this.props.rating_1) {
            ratings.push(1);
        }
        if (this.props.rating_2) {
            ratings.push(2);
        }
        if (this.props.rating_3) {
            ratings.push(3);
        }
        if (this.props.rating_4) {
            ratings.push(4);
        }
        if (this.props.rating_5) {
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
        this.setState({ loading: true });

        axios.get('/api/bits', {
            params: this.prepareFetchFilterParams()
        }).then(response => {
            this.setState({ bits: response.data.data, loading: false });
        }).catch(error => {
            this.setState({ loading: false });
        })
    }

    showBitModalHandler = (id) => {
        this.setState({ loading: true });

        axios.get('/api/bits/' + id)
            .then(response => {
                this.setState({ bit: response.data.data, loading: false })
            })
            .catch(error => {
                this.setState({ loading: false });
            });
    }

    hideBitModalHandler = () => {
        this.setState({ bit: null });
    }

    render() {

        let spinner = this.state.loading
            ? <Spinner />
            : null;

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

                {spinner}

                {list}

                {modal}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        players_1: state.bitsFilter.players_1,
        players_2: state.bitsFilter.players_2,
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

export default connect(mapStateToProps)(withErrorHandler(Explore, axios));