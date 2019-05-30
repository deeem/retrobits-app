import React from 'react';
import Header from '../Header/Header';

const layout = (props) => (
    <>
        <Header/>
        <>
            {props.children}
        </>
    </>
);

export default layout;