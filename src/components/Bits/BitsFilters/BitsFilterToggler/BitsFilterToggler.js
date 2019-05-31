import React from 'react';
import './BitsFilterToggler.css';
import filterIcon from '../../../../assets/images/iconfinder_00-ELASTOFONT-STORE-READY_sliders_2738302.svg';

const BitsFilterToggler = (props) => {

    return (

        <div className="filter-bar">
            <button className="filter-toggler" onClick={props.clicked}>
                <img src={filterIcon} />
            </button>
        </div>
    )
}

export default BitsFilterToggler;