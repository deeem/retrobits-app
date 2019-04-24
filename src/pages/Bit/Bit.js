import React, { Component } from 'react';
import classes from './Bit.module.css';
import axios from 'axios';

class Bit extends Component {

    state = {
        bit: null,
    }

    componentDidMount() {
        const id = new URLSearchParams(this.props.location.search).get('id')

        axios.get('http://127.0.0.1:8000/api/bits/' + id)
            .then(response => {
                this.setState({ bit: response.data.data });
                console.log(response.data.data);
            });
    }

    render() {
        return <h1>A Bit Page</h1>
    }
}
export default Bit;