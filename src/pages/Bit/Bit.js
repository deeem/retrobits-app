import React, { Component } from 'react';
import classes from './Bit.module.css';
import axios from '../../axios-retrobits';
import BitInfo from '../../components/Bits/BitInfo/BitInfo'
import Modal from '../../components/UI/Modal/Modal'
import withErrorHandler from '../../components/UI/withErrorHandler/withErrorHanlder';

class Bit extends Component {

    state = {
        bit: null,
    }

    hideBitModalHandler = () => {
        this.props.history.push('/');
    }

    componentDidMount() {
        const id = new URLSearchParams(this.props.location.search).get('id')

        axios.get('/api/bits/' + id)
            .then(response => {
                this.setState({ bit: response.data.data });
                console.log(response.data.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {

        let modal = this.state.bit
            ? <Modal show={this.state.bit.id}>
                <BitInfo
                    hide={this.hideBitModalHandler}
                    bit={this.state.bit} />
            </Modal>
            : null;

        return (
            <div className={classes.Bit}>
                {modal}
            </div>
        )
    }
}

export default withErrorHandler(Bit, axios);