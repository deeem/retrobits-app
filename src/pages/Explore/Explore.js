import React, { Component } from 'react'
import { connect } from 'react-redux';

import './Explore.css';
import axios from '../../axios-retrobits';
import BitList from '../../components/Bits/BitList/BitList'
import BitInfo from '../../components/Bits/BitInfo/BitInfo'
import Modal from '../../components/UI/Modal/Modal'
import Spinner from '../../components/UI/Spinner/Spinner'
import BitsFilterToggler from '../../components/Bits/BitsFilters/BitsFilterToggler/BitsFilterToggler';
import BitsFilters from '../../components/Bits/BitsFilters/BitsFilters'
import BitsPaginator from '../../components/Bits/BitsPaginator/BitsPaginator'
import withErrorHandler from '../../components/UI/withErrorHandler/withErrorHanlder';


class Explore extends Component {
    state = {
        bits: null,
        bit: null,
        loading: false,
        url: '/api/bits',
        pagination: {},
        isFilterVisible: false,
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
            || (prevProps.rating_5 !== undefined && prevProps.rating_5 !== this.props.rating_5)
            || (prevProps.platform_spectrum !== undefined && prevProps.platform_spectrum !== this.props.platform_spectrum)
            || (prevProps.platform_nes !== undefined && prevProps.platform_nes !== this.props.platform_nes)
            || (prevProps.platform_snes !== undefined && prevProps.platform_snes !== this.props.platform_snes)
            || (prevProps.platform_sega !== undefined && prevProps.platform_sega !== this.props.platform_sega);

        if (shouldFetch) {
            this.fetchBits();
        }
    }

    prepareFetchFilterParams = (params) => {
        const platforms = [];
        const players = [];
        const difficults = [];
        const ratings = [];

        if (this.props.platform_spectrum) {
            platforms.push('spectrum');
        }
        if (this.props.platform_nes) {
            platforms.push('nes');
        }
        if (this.props.platform_snes) {
            platforms.push('snes');
        }
        if (this.props.platform_sega) {
            platforms.push('sega');
        }
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

        if (platforms.length) {
            filters['filter[platform]'] = platforms.join(',');
        }

        if (players.length) {
            filters['filter[players]'] = players.join(',');
        }

        if (difficults.length) {
            filters['filter[difficult]'] = difficults.join(',');
        }

        if (ratings.length) {
            filters['filter[rating]'] = ratings.join(',');
        }

        return {
            ...filters,
            ...params
        }
    }

    fetchBits = (params) => {
        this.setState({ loading: true });

        axios.get('/api/bits', {
            params: this.prepareFetchFilterParams(params)
        }).then(response => {
            this.setState({
                bits: response.data.data,
                loading: false,
                pagination: {
                    current: response.data.meta.current_page,
                    first: response.data.links.first,
                    last: response.data.links.last,
                    next: response.data.links.next,
                    prev: response.data.links.prev,
                }
            });
            window.scrollTo(0, 0);
        }).catch(error => {
            this.setState({ loading: false });
        })
    }

    handlePaginate = (url) => {
        if (url) {
            const page = new URL(url).searchParams.get('page');
            this.fetchBits({ page });
        }
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

    handleBitFilterToggle = () => {
        this.setState({ isFilterVisible: !this.state.isFilterVisible });
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
            <main className="main-explore">
                <BitsFilterToggler clicked={this.handleBitFilterToggle} />
                <BitsFilters visible={this.state.isFilterVisible} />

                {spinner}
                {list}

                <BitsPaginator
                    current={this.state.pagination.current}
                    clickedFirst={() => this.handlePaginate(this.state.pagination.first)}
                    clickedLast={() => this.handlePaginate(this.state.pagination.last)}
                    clickedNext={() => this.handlePaginate(this.state.pagination.next)}
                    clickedPrev={() => this.handlePaginate(this.state.pagination.prev)}
                />

                {modal}
            </main>
        );
    }
}

const mapStateToProps = state => {
    return {
        platform_spectrum: state.bitsFilter.platform_spectrum,
        platform_nes: state.bitsFilter.platform_nes,
        platform_snes: state.bitsFilter.platform_snes,
        platform_sega: state.bitsFilter.platform_sega,
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